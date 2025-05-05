import React, { useEffect, useRef, useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Users, Share, Settings, X } from 'lucide-react';

export default function StudyRoom() {
  const videoContainerRef = useRef(null);
  const [callFrame, setCallFrame] = useState(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('chat');

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Emma Thompson', content: 'Hi everyone! Ready to study Calculus?', time: '10:30 AM' },
    { id: 2, sender: 'You', content: 'Yes, I\'m having trouble with derivatives.', time: '10:32 AM' },
    { id: 3, sender: 'David Kim', content: 'I can help with that! Let\'s go through some examples.', time: '10:33 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Import Daily.co SDK dynamically to prevent SSR issues
    const loadDaily = async () => {
      try {
        // Make sure the element exists in the DOM first
        if (!videoContainerRef.current) {
          console.error("Video container ref is not available");
          return;
        }
        
        // Check if Daily.co is already loaded to prevent duplicate initialization
        if (window.DailyIframe) {
          console.log("Using preloaded Daily.co SDK");
          initializeDaily(window.DailyIframe);
          return;
        }
        
        console.log("Loading Daily.co SDK dynamically");
        
        // Load the Daily.co script if not already loaded
        try {
          // Dynamically import the Daily.co SDK
          const DailyIframe = (await import('@daily-co/daily-js')).default;
          initializeDaily(DailyIframe);
        } catch (importError) {
          console.error("Failed to import Daily.co SDK:", importError);
          
          // Alternative: Load script tag directly if module import fails
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@daily-co/daily-js/dist/daily-iframe.js';
          script.async = true;
          script.onload = () => {
            if (window.DailyIframe) {
              initializeDaily(window.DailyIframe);
            } else {
              console.error("Daily.co SDK loaded but DailyIframe not found");
            }
          };
          script.onerror = (e) => {
            console.error("Failed to load Daily.co script:", e);
          };
          document.body.appendChild(script);
        }
      } catch (error) {
        console.error('Error in Daily.co setup:', error);
        // Fallback to placeholder UI
        setParticipants([
          { session_id: '1', user_name: 'Emma Thompson', audio: true, video: true, local: false },
          { session_id: '2', user_name: 'You', audio: true, video: true, local: true },
          { session_id: '3', user_name: 'David Kim', audio: true, video: false, local: false },
        ]);
      }
    };
    
    // Function to initialize Daily.co with the SDK
    const initializeDaily = (DailyIframe) => {
      if (!videoContainerRef.current) return;
      
      console.log("Creating Daily.co frame in container:", videoContainerRef.current);
      
      // Create a new call frame
      const dailyFrame = DailyIframe.createFrame(videoContainerRef.current, {
        showLeaveButton: false,
        iframeStyle: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: '#f9fafb',
        },
      });
      
      // Set up event handlers
      const handleParticipantsChange = (event) => {
        if (!dailyFrame) return;
        const participantsObj = dailyFrame.participants();
        if (participantsObj) {
          // Convert participants object to array
          const participantsArray = Object.values(participantsObj);
          setParticipants(participantsArray);
        }
      };

      // Event listeners for participant updates
      dailyFrame
        .on('joined-meeting', handleParticipantsChange)
        .on('participant-joined', handleParticipantsChange)
        .on('participant-left', handleParticipantsChange)
        .on('participant-updated', handleParticipantsChange);

      // Join the call
      try {
        // You should get this URL and token from your server
        dailyFrame.join({ 
          url: 'https://studymatch.daily.co/testrun2',
         
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyIjoidGVzdHJ1bjIiLCJkIjoiMjI4MDA2NjgtNDM5OS00Mjk3LWIwODUtYTdhMzA5M2MzNjhiIiwiaWF0IjoxNzQ2NDcyNzUxfQ.16dHS3KnQw9G9vl_E_PaBjoKroLHOuiY3RY3rQTM8dw"
        }).then(() => {
          console.log("Successfully joined Daily.co room");
          setCallFrame(dailyFrame);
        }).catch(joinError => {
          console.error("Error joining Daily.co room:", joinError);
        });
      } catch (error) {
        console.error('Error joining Daily.co room:', error);
      }
    };
    
    loadDaily();
    
    // Cleanup function for the entire useEffect
    return () => {
      if (callFrame) {
        callFrame.destroy();
      }
    };
  }, [callFrame]);

  const toggleMic = () => {
    const newMicState = !isMicMuted;
    setIsMicMuted(newMicState);
    
    if (callFrame) {
      callFrame.setLocalAudio(!newMicState);
    }
  };

  const toggleVideo = () => {
    const newVideoState = !isVideoOff;
    setIsVideoOff(newVideoState);
    
    if (callFrame) {
      callFrame.setLocalVideo(!newVideoState);
    }
  };

  const leaveCall = () => {
    if (callFrame) {
      callFrame.leave();
    }
    // Navigate back or to a specific page
    window.history.back();
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real implementation, you would send this message through Daily.co's messaging system
    // or your own backend
    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-100 relative overflow-hidden" style={{ minHeight: '400px' }}>
          {/* This container is where Daily.co will insert its iframe */}
          <div 
            ref={videoContainerRef} 
            className="w-full h-full relative" 
            id="daily-container"
          >
            {/* Daily.co will inject the iframe here automatically */}
            {!callFrame && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Loading video call...</p>
              </div>
            )}
          </div>
        </div>

        {showSidebar && (
          <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSidebarContent('chat')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    sidebarContent === 'chat'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setSidebarContent('participants')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    sidebarContent === 'participants'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Participants
                </button>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {sidebarContent === 'chat' ? (
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'You' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                          message.sender === 'You'
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.sender !== 'You' && (
                          <p className="text-xs font-medium text-gray-600">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-right mt-1 text-gray-500">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    In this room ({participants.length})
                  </h3>
                  <ul className="space-y-3">
                    {participants.map((participant) => (
                      <li
                        key={participant.session_id}
                        className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          {participant.user_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {participant.user_name || 'Unknown'} {participant.local && '(You)'}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 flex items-center">
                              {participant.audio ? (
                                <Mic className="w-3 h-3 text-green-500 mr-1" />
                              ) : (
                                <MicOff className="w-3 h-3 text-red-500 mr-1" />
                              )}
                              Audio
                            </span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-xs text-gray-500 flex items-center">
                              {participant.video ? (
                                <Video className="w-3 h-3 text-green-500 mr-1" />
                              ) : (
                                <VideoOff className="w-3 h-3 text-red-500 mr-1" />
                              )}
                              Video
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {sidebarContent === 'chat' && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="ml-2 inline-flex items-center justify-center rounded-md text-white bg-indigo-600 hover:bg-indigo-700 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center">
        <div className="flex-1 flex justify-center space-x-4">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full ${
              isMicMuted
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isMicMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              isVideoOff
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
          <button
            onClick={leaveCall}
            className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            <Phone size={20} />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSidebarContent('chat');
              setShowSidebar(!showSidebar);
            }}
            className={`p-2 rounded-md ${
              showSidebar && sidebarContent === 'chat'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageSquare size={20} />
          </button>
          <button
            onClick={() => {
              setSidebarContent('participants');
              setShowSidebar(!showSidebar);
            }}
            className={`p-2 rounded-md ${
              showSidebar && sidebarContent === 'participants'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users size={20} />
          </button>
          <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Share size={20} />
          </button>
          <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}