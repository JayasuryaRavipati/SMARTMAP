# 🚚 SMARTMAP - Smart Delivery Route Optimization System

SMARTMAP is a full-stack delivery management and route optimization web application designed for delivery drivers.

It helps drivers manage deliveries, track their current location, visualize delivery points on a map, and organize deliveries into an optimized sequence.

The project follows the **KISS (Keep It Simple, Stupid)** principle by keeping the interface simple while providing practical delivery management and routing features.

---

# 📌 Project Overview

SMARTMAP allows delivery drivers to:

- Register and securely log in
- Manage their profile
- Add customer delivery details
- View and search deliveries
- Track delivery priority and status
- View delivery locations on an interactive map
- Track the driver's current GPS location
- Automatically update the driver's location while moving
- Optimize the delivery sequence
- Display the route between delivery locations
- Remove completed deliveries from the active route
- View delivery details
- Edit and delete deliveries

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Persistent authentication

---

## 📊 Dashboard

- Driver Dashboard
- Quick Actions
- Delivery Map
- Recent Deliveries
- Search Deliveries
- Responsive Layout
- Driver Current Location

---

## 📦 Delivery Management

- Add Delivery
- View All Deliveries
- Search Deliveries
- Filter deliveries by priority/status
- View Delivery Details
- Edit Delivery
- Delete Delivery
- Delivery Status Management
- Priority Management

Supported priorities include:

- Super
- High
- Normal

Supported statuses include:

- Pending
- On Route
- Delivered

---

# 🗺️ Live Map & Driver Tracking

SMARTMAP uses browser geolocation to track the driver's current position.

The driver's location is continuously monitored using the browser Geolocation API.

When the driver moves:

```text
Driver Location
      ↓
Browser GPS
      ↓
Location Updated
      ↓
Driver Marker Moves
      ↓
Map Updates
      ↓
Route Updates
