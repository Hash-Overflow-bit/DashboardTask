/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  IoMailOutline,
  IoSearchOutline,
  IoSendSharp,
  IoArrowBack,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { RiInboxLine, RiFilterLine } from "react-icons/ri";
import { MdOutlineUnarchive, MdMoreVert } from "react-icons/md";
import { HiOutlineUsers, HiOutlineUserGroup } from "react-icons/hi";
import { BsThreeDots, BsPaperclip, BsMic } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import "./dashboard.css";

function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeMenu, setActiveMenu] = useState("My Inbox");
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [sidebarUsers, setSidebarUsers] = useState([]);
  const [sidebarChannels, setSidebarChannels] = useState([]);
  const [loadingSidebarUsers, setLoadingSidebarUsers] = useState(false);
  const [loadingSidebarChannels, setLoadingSidebarChannels] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState(false);
  const [expandedChannels, setExpandedChannels] = useState(false);
  const [error, setError] = useState(null);

  // Mobile navigation states
  const [mobileView, setMobileView] = useState("none"); // "none", "list", "chat"

  const colors = [
    "#7c3aed",
    "#8b5cf6",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#eab308",
    "#ec4899",
    "#6366f1",
  ];

  // ============ API 1: Fetch users for chat list ============
  // Using JSONPlaceholder: https://jsonplaceholder.typicode.com/users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingChats(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();

        // Transform API data to chat list format
        const transformedChats = users.slice(0, 8).map((user, index) => ({
          id: user.id,
          name: user.name,
          message: user.company.catchPhrase,
          time: `${20 + index}:${index * 10 || "00"}`,
          avatar: user.name.charAt(0),
          color: colors[index % colors.length],
          unread: false,
          email: user.email,
          phone: user.phone,
          username: user.username,
        }));

        setChatList(transformedChats);
        if (transformedChats.length > 0) {
          setSelectedChat(transformedChats[0].id);
        }
        setLoadingChats(false);
      } catch (err) {
        setError("Failed to load chat list");
        console.error("API Error:", err);
        setLoadingChats(false);
      }
    };

    fetchUsers();
  }, []);

  // ============ API 2: Fetch messages when chat is selected ============
  // Using JSONPlaceholder Comments API: https://jsonplaceholder.typicode.com/comments
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        setLoadingMessages(true);
        // Fetch comments as messages
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${selectedChat}`
        );
        const comments = await response.json();

        // Transform comments to message format
        const transformedMessages = comments
          .slice(0, 6)
          .map((comment, index) => ({
            id: comment.id,
            sender: index % 2 === 0 ? "Other" : "You",
            text: comment.body.substring(0, 100),
            time: `${23 - (index % 5)}:${String(index * 10).padStart(2, "0")}`,
            isUser: index % 2 !== 0,
          }));

        setMessages(transformedMessages);
        setLoadingMessages(false);
      } catch (err) {
        setError("Failed to load messages");
        console.error("API Error:", err);
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // ============ API 3: Fetch user details ============
  // Using JSONPlaceholder Users API: https://jsonplaceholder.typicode.com/users/{id}
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!selectedChat) return;

      try {
        setLoadingDetails(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selectedChat}`
        );
        const user = await response.json();

        setSelectedUserDetails({
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          phone: user.phone,
          company: user.company.name,
          website: user.website,
          username: user.username,
        });
        setLoadingDetails(false);
      } catch (err) {
        console.error("Failed to load user details", err);
        setLoadingDetails(false);
      }
    };

    fetchUserDetails();
  }, [selectedChat]);

  // ============ API 4: Fetch sidebar users ============
  // Using JSONPlaceholder: https://jsonplaceholder.typicode.com/users
  useEffect(() => {
    const fetchSidebarUsers = async () => {
      try {
        setLoadingSidebarUsers(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();

        // Transform users for sidebar display
        const transformedUsers = users.slice(0, 10).map((user) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.name.charAt(0),
        }));

        setSidebarUsers(transformedUsers);
        setLoadingSidebarUsers(false);
      } catch (err) {
        console.error("Failed to load sidebar users", err);
        setLoadingSidebarUsers(false);
      }
    };

    fetchSidebarUsers();
  }, []);

  // ============ API 5: Fetch sidebar channels ============
  // Using JSONPlaceholder Posts as channels: https://jsonplaceholder.typicode.com/posts
  useEffect(() => {
    const fetchSidebarChannels = async () => {
      try {
        setLoadingSidebarChannels(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=8"
        );
        const posts = await response.json();

        // Transform posts to channels format
        const transformedChannels = posts.map((post) => ({
          id: post.id,
          title: post.title.split(" ").slice(0, 3).join(" "), // First 3 words
          userId: post.userId,
        }));

        setSidebarChannels(transformedChannels);
        setLoadingSidebarChannels(false);
      } catch (err) {
        console.error("Failed to load sidebar channels", err);
        setLoadingSidebarChannels(false);
      }
    };

    fetchSidebarChannels();
  }, []);

  const selectedChatData = chatList.find((chat) => chat.id === selectedChat);

  // Mobile navigation handlers
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    setMobileView("chat"); // Switch to chat view on mobile
  };

  const handleBackToList = () => {
    setMobileView("list");
  };

  const handleBackToNone = () => {
    setMobileView("none");
  };

  const handleOpenChatList = () => {
    setMobileView("list");
  };

  // Scroll-reveal: animate elements as they enter viewport
  useEffect(() => {
    const rootEl = document.querySelector(".dashboard-content");
    if (!rootEl) return;

    const items = rootEl.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => {
      el.classList.remove("in-view");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [
    chatList,
    messages,
    loadingChats,
    loadingMessages,
    loadingDetails,
    expandedUsers,
    expandedChannels,
  ]);

  // ============ Skeleton Loading Components ============
  const SkeletonChatItem = () => (
    <div className="chat-skeleton-item">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-name"></div>
        <div className="skeleton skeleton-message"></div>
      </div>
    </div>
  );

  const SkeletonMessageItem = ({ isUser }) => (
    <div className={`message-skeleton ${isUser ? "user" : ""}`}>
      {!isUser && <div className="skeleton skeleton-avatar"></div>}
      <div className="skeleton skeleton-bubble"></div>
    </div>
  );

  const SkeletonDetailRow = () => (
    <div className="details-skeleton-row">
      <div className="skeleton skeleton-label"></div>
      <div className="skeleton skeleton-value"></div>
    </div>
  );

  const SkeletonSidebarItem = () => (
    <div className="sidebar-skeleton-item">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-badge"></div>
    </div>
  );

  if (loadingChats && chatList.length === 0) {
    return (
      <div className="dashboard-main-container">
        <Navbar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading dashboard data from API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main-container">
      <Navbar />

      {/* Mobile Message Icon Button */}
      <button className="mobile-message-btn" onClick={handleOpenChatList}>
        <IoChatbubbleEllipsesOutline />
        <span>Messages</span>
      </button>

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Inbox</h3>
          </div>
          <ul className="sidebar-menu">
            <li className={activeMenu === "My Inbox" ? "active" : ""}>
              <RiInboxLine className="menu-icon" />
              <span>My Inbox</span>
            </li>
            <li className={activeMenu === "All" ? "active" : ""}>
              <IoMailOutline className="menu-icon" />
              <span>All</span>
              <span className="badge">25</span>
            </li>
            <li className={activeMenu === "Unassigned" ? "active" : ""}>
              <MdOutlineUnarchive className="menu-icon" />
              <span>Unassigned</span>
            </li>
          </ul>

          <div className="sidebar-section">
            <h4>
              Teams <FiChevronDown className="chevron" />
            </h4>
            <ul className="sidebar-submenu">
              <li>
                <HiOutlineUsers className="menu-icon" />
                <span>Sales</span>
                <span className="badge">7</span>
              </li>
              <li>
                <HiOutlineUserGroup className="menu-icon" />
                <span>Customer Support</span>
                <span className="badge">16</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h4
              onClick={() => setExpandedUsers(!expandedUsers)}
              style={{ cursor: "pointer" }}
            >
              Users{" "}
              <FiChevronDown
                className={`chevron ${expandedUsers ? "open" : ""}`}
              />
            </h4>
            {expandedUsers && (
              <ul className="sidebar-submenu">
                {loadingSidebarUsers ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <SkeletonSidebarItem key={i} />
                    ))}
                  </>
                ) : (
                  sidebarUsers.map((user, idx) => (
                    <li
                      key={user.id}
                      className="scroll-animate"
                      style={{
                        cursor: "pointer",
                        transitionDelay: `${idx * 40}ms`,
                      }}
                    >
                      <div
                        className="user-avatar-small"
                        style={{
                          backgroundColor: [
                            "#7c3aed",
                            "#8b5cf6",
                            "#f59e0b",
                            "#3b82f6",
                            "#ef4444",
                          ][user.id % 5],
                        }}
                      >
                        {user.avatar}
                      </div>
                      <span>{user.name}</span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <div className="sidebar-section">
            <h4
              onClick={() => setExpandedChannels(!expandedChannels)}
              style={{ cursor: "pointer" }}
            >
              Channels{" "}
              <FiChevronDown
                className={`chevron ${expandedChannels ? "open" : ""}`}
              />
            </h4>
            {expandedChannels && (
              <ul className="sidebar-submenu">
                {loadingSidebarChannels ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="sidebar-skeleton-item">
                        <div className="skeleton skeleton-icon"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    ))}
                  </>
                ) : (
                  sidebarChannels.map((channel, idx) => (
                    <li
                      key={channel.id}
                      className="channel-item scroll-animate"
                      style={{
                        cursor: "pointer",
                        transitionDelay: `${idx * 40}ms`,
                      }}
                    >
                      <div className="channel-dot"></div>
                      <span title={channel.title}>{channel.title}</span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Chat List - API CONNECTED */}
        <div
          className={`chat-list ${mobileView === "list" ? "mobile-show" : ""}`}
        >
          <div className="chat-list-header">
            <div className="header-left">
              <button className="mobile-back-btn" onClick={handleBackToNone}>
                <IoArrowBack />
              </button>
              <button className="icon-btn">
                <IoMailOutline />
              </button>
              <span className="header-title">
                {selectedChatData?.name || "Chat"}
              </span>
              <button className="icon-btn">
                <MdMoreVert />
              </button>
            </div>
          </div>

          <div className="chat-list-filters">
            <button className="filter-btn active">
              Open <FiChevronDown />
            </button>
            <button className="filter-btn">Newest</button>
            <div className="search-box">
              <IoSearchOutline className="search-icon" />
              <input type="text" placeholder="Search Chat" />
              <RiFilterLine className="filter-icon" />
            </div>
          </div>

          <div className="chat-items">
            {loadingChats && chatList.length === 0 ? (
              <>
                {[...Array(8)].map((_, i) => (
                  <SkeletonChatItem key={i} />
                ))}
              </>
            ) : (
              chatList.map((chat, idx) => (
                <div
                  key={chat.id}
                  className={`chat-item scroll-animate ${
                    selectedChat === chat.id ? "active" : ""
                  }`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div
                    className="chat-avatar"
                    style={{ backgroundColor: chat.color }}
                  >
                    {chat.avatar}
                  </div>
                  <div className="chat-info">
                    <div className="chat-top">
                      <span className="chat-name">{chat.name}</span>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                    <p className="chat-message">{chat.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area - API CONNECTED */}
        <div
          className={`chat-area ${mobileView === "chat" ? "mobile-show" : ""}`}
        >
          <div className="chat-header">
            <div className="chat-header-left">
              <button className="mobile-back-btn" onClick={handleBackToList}>
                <IoArrowBack />
              </button>
              <span className="chat-header-title">
                {selectedChatData?.name || "Select a chat"}
              </span>
              <button className="icon-btn">
                <MdMoreVert />
              </button>
            </div>
            <div className="chat-header-right">
              <span className="status-badge">Open</span>
            </div>
          </div>

          <div className="messages-container">
            {messages.length > 0 && (
              <div className="date-divider">
                <span>28 August 2025</span>
              </div>
            )}
            {loadingMessages ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <SkeletonMessageItem key={i} isUser={i % 2 === 0} />
                ))}
              </>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`message scroll-animate ${
                    msg.isUser ? "user-message" : "other-message"
                  }`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {!msg.isUser && (
                    <div
                      className="message-avatar"
                      style={{
                        backgroundColor: selectedChatData?.color || "#8b5cf6",
                      }}
                    >
                      {selectedChatData?.avatar || "U"}
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-header">
                      {!msg.isUser && (
                        <span className="message-sender">
                          {selectedChatData?.name}
                        </span>
                      )}
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="message-input-container">
            <input
              type="text"
              placeholder="Type something..."
              className="message-input"
            />
            <div className="input-actions">
              <button className="input-icon-btn">
                <BsPaperclip />
              </button>
              <button className="input-icon-btn">
                <BsMic />
              </button>
              <button className="send-btn">
                <IoSendSharp />
              </button>
            </div>
          </div>
        </div>

        {/* Details Panel - API CONNECTED */}
        <div className="details-panel">
          <div className="details-header">
            <h3>Details</h3>
            <button className="icon-btn">
              <MdMoreVert />
            </button>
          </div>

          <div className="details-section">
            <div className="section-header">
              <h4>Chat Data</h4>
              <FiChevronDown />
            </div>
            <div className="section-content">
              <div className="detail-row scroll-animate">
                <span className="detail-label">Assignee</span>
                <div className="detail-value">
                  <div className="mini-avatar">J</div>
                  <span>James West</span>
                </div>
              </div>
              <div className="detail-row scroll-animate">
                <span className="detail-label">Team</span>
                <div className="detail-value">
                  <div className="mini-avatar">S</div>
                  <span>Sales Team</span>
                </div>
              </div>
            </div>
          </div>

          {selectedUserDetails && !loadingDetails ? (
            <div className="details-section">
              <div className="section-header">
                <h4>Contact Data</h4>
                <FiChevronDown />
              </div>
              <div className="section-content">
                <div className="detail-row scroll-animate">
                  <span className="detail-label">First Name</span>
                  <span className="detail-text">
                    {selectedUserDetails.firstName}
                  </span>
                </div>
                <div className="detail-row scroll-animate">
                  <span className="detail-label">Last Name</span>
                  <span className="detail-text">
                    {selectedUserDetails.lastName}
                  </span>
                </div>
                <div className="detail-row scroll-animate">
                  <span className="detail-label">Phone number</span>
                  <span className="detail-text">
                    {selectedUserDetails.phone}
                  </span>
                </div>
                <div className="detail-row scroll-animate">
                  <span className="detail-label">Email</span>
                  <span className="detail-text">
                    {selectedUserDetails.email}
                  </span>
                </div>
                <div className="detail-row scroll-animate">
                  <span className="detail-label">Company</span>
                  <span className="detail-text">
                    {selectedUserDetails.company}
                  </span>
                </div>
                <button className="see-all-btn">See all</button>
              </div>
            </div>
          ) : (
            <div className="details-section">
              <div className="skeleton-title skeleton"></div>
              <div className="section-content">
                {[...Array(5)].map((_, i) => (
                  <SkeletonDetailRow key={i} />
                ))}
              </div>
            </div>
          )}

          <div className="details-section">
            <div className="section-header">
              <h4>Contact Labels</h4>
              <FiChevronDown />
            </div>
            <div className="section-content">
              <div className="labels">
                <span className="label label-blue">Close plan</span>
                <span className="label label-purple">Chicago</span>
                <button className="add-label-btn">
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="section-header">
              <h4>Notes</h4>
              <FiChevronDown />
            </div>
            <div className="section-content">
              <div className="note-item">
                <button className="add-note-btn">Add a note</button>
              </div>
              <div className="note highlighted">
                <span>Strong potential for future upgrades</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="section-header">
              <h4>Other Chats</h4>
              <FiChevronDown />
            </div>
            <div className="section-content">
              <div className="other-chat-item">
                <div className="channel-indicator">F</div>
                <div className="other-chat-info">
                  <span className="other-chat-name">FitLife</span>
                  <span className="other-chat-status">On my way!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
