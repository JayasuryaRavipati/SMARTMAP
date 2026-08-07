import { useState } from "react";
import {
  FaBell,
  FaMoon,
  FaLock,
  FaSave,
  FaCog,
} from "react-icons/fa";

import "../styles/Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoLogout: true,
  });

  const handleToggle = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings Updated Successfully");
  };

  return (
    <div className="settings-page">

      <div className="settings-card">

        <div className="settings-header">

          <div className="settings-title">

            <FaCog className="settings-main-icon" />

            <div>
              <h1>Settings</h1>
              <p>Customize your SMARTMAP experience</p>
            </div>

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Notifications */}

          <div className="setting-item">

            <div className="setting-info">

              <FaBell className="setting-icon" />

              <div>

                <h3>Notifications</h3>

                <p>
                  Receive delivery alerts, reminders and important updates.
                </p>

              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleToggle}
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* Dark Mode */}

          <div className="setting-item">

            <div className="setting-info">

              <FaMoon className="setting-icon" />

              <div>

                <h3>Dark Mode</h3>

                <p>
                  Dark theme support will be available soon.
                </p>

              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                disabled
              />

              <span className="slider disabled"></span>

            </label>

          </div>

          {/* Auto Logout */}

          <div className="setting-item">

            <div className="setting-info">

              <FaLock className="setting-icon" />

              <div>

                <h3>Auto Logout</h3>

                <p>
                  Automatically sign out after long inactivity.
                </p>

              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                name="autoLogout"
                checked={settings.autoLogout}
                onChange={handleToggle}
              />

              <span className="slider"></span>

            </label>

          </div>

          <button
            className="save-settings-btn"
            type="submit"
          >
            <FaSave />
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default Settings;