# RideDMJ 🚌

RideDMJ is a full-stack bus ticketing platform designed for students of **IIITDM Jabalpur**. It allows students to view available bus slots, book tickets, complete online payments, and access their booking details with QR-based ticket verification.

The project aims to make campus transportation more organized, convenient, and transparent.

---

## ✨ Features

### Student Features

- College email-based authentication
- Restriction to `@iiitdmj.ac.in` email addresses
- View available bus slots according to the current day
- View official bus timings
- Book bus tickets online
- Online payment integration using Cashfree
- View personal booking history
- View generated ticket details and QR codes
- QR-based ticket verification through the Scan page
- Responsive interface for desktop and mobile devices

### Booking Features

- Institute-to-Sadar bus booking
- Different departure slots
- Day-wise bus availability
- Ticket booking confirmation
- Booking history for individual users
- Backend-based trip and booking management

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- JavaScript
- Supabase Authentication
- `html5-qrcode` for QR scanning

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Supabase
- HTTPX
- Python-Jose

### Payment Gateway

- Cashfree Payments

### Deployment

- Vercel — Frontend
- Render — Backend
- Supabase — Authentication and Database

---

## 📁 Project Structure

```text
RideDMJ/
│
├── backend/
│   ├── booking_info/
│   ├── bookings/
│   ├── migrations/
│   ├── payments/
│   ├── trips/
│   ├── users/
│   ├── .env
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── app/
│   │   ├── about/
│   │   ├── book-ticket/
│   │   ├── busschedule/
│   │   ├── confirm/
│   │   ├── login/
│   │   ├── my-booking/
│   │   ├── register/
│   │   ├── scan/
│   │   └── page.js
│   │
│   ├── component/
│   ├── data/
│   ├── public/
│   ├── utils/
│   ├── .env.local
│   ├── package.json
│   └── next.config.mjs
│
└── README.md
```

---

## 🔄 Application Flow

```text
Student visits RideDMJ
          │
          ▼
      Register/Login
          │
          ▼
   View available bus slots
          │
          ▼
      Select a trip
          │
          ▼
    Confirm booking details
          │
          ▼
      Complete payment
          │
          ▼
     Booking is created
          │
          ▼
  View ticket in My Bookings
          │
          ▼
     QR-based verification
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rishabh-09-eng/RideDMJ.git
cd RideDMJ
```

---

## 💻 Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## ⚙️ Backend Setup

Open a new terminal and move into the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key

SQLALCHEMY_DATABASE_URL=your_postgresql_connection_string

CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENVIRONMENT=sandbox
```

Start the FastAPI server:

```bash
uvicorn run:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

## 🔐 Environment Variables

### Frontend Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anonymous key |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

### Backend Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Backend Supabase key |
| `SQLALCHEMY_DATABASE_URL` | PostgreSQL database connection string |
| `CASHFREE_APP_ID` | Cashfree application ID |
| `CASHFREE_SECRET_KEY` | Cashfree secret key |
| `CASHFREE_ENVIRONMENT` | Cashfree environment, such as `sandbox` |

> Never commit `.env` or `.env.local` files to GitHub. Never expose secret keys in frontend code.

---

## 📡 Main API Modules

The backend is organized into separate modules for different responsibilities:

| Module | Responsibility |
|---|---|
| Authentication | Validate authenticated users |
| Trips | Fetch and manage available bus trips |
| Bookings | Create and manage ticket bookings |
| Booking Information | Retrieve a user's booking history |
| Payments | Create and process payment orders |
| QR Verification | Verify ticket QR codes through the Scan page |

The complete interactive API documentation is available through FastAPI Swagger UI:

```text
http://localhost:8000/docs
```

---

## 💳 Payment Integration

RideDMJ uses **Cashfree Payments** for online ticket payments.

The general payment process is:

1. The student selects a bus trip.
2. The frontend requests a payment order from the backend.
3. The backend creates an order using Cashfree.
4. The student completes the payment.
5. The booking confirmation flow displays the ticket details.
6. The ticket can be accessed through the My Bookings page.

For local development, use Cashfree's sandbox environment.

---

## 📱 QR Ticket Verification

Each confirmed booking can be represented through a QR code.

The Scan page allows the QR code to be scanned and sent to the backend for verification. The verification process can be used to check whether a ticket is valid and associated with an existing booking.

The scanning interface is implemented using:

```text
html5-qrcode
```

---

## 🌐 Deployment

### Frontend Deployment — Vercel

1. Import the repository into Vercel.
2. Set the frontend root directory to:

```text
frontend
```

3. Configure the required frontend environment variables.
4. Set the backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

5. Deploy the project.

### Backend Deployment — Render

1. Create a new Web Service on Render.
2. Connect the GitHub repository.
3. Set the root directory to:

```text
backend
```

4. Use the following build command:

```bash
pip install -r requirements.txt
```

5. Use the following start command:

```bash
uvicorn run:app --host 0.0.0.0 --port $PORT
```

6. Add all required backend environment variables.
7. Configure the backend CORS settings to allow requests from the deployed Vercel frontend.

---

## 🔒 Security Considerations

- Only institute email addresses should be allowed to register.
- Authentication tokens must be validated on the backend.
- Sensitive environment variables must remain server-side.
- Cashfree secret keys must never be exposed in frontend code.
- Database credentials must not be committed to the repository.
- Booking and ticket verification should always be validated by the backend.
- Frontend visibility controls should not be treated as backend authorization.
- Production deployments should use HTTPS.

---

## 🧪 Local Development Checklist

Before running the project, make sure that:

- [ ] Node.js and npm are installed
- [ ] Python is installed
- [ ] Backend virtual environment is activated
- [ ] Frontend dependencies are installed
- [ ] Backend dependencies are installed
- [ ] Supabase credentials are configured
- [ ] PostgreSQL connection string is configured
- [ ] Cashfree credentials are configured
- [ ] Frontend API URL points to the backend
- [ ] Backend CORS allows the frontend origin
- [ ] Both frontend and backend servers are running

---

## 🤝 Team

RideDMJ was developed as a collaborative full-stack project by a team of students.

The project includes contributions across:

- Frontend development
- Backend API development
- Database design and integration
- Authentication
- Payment integration
- QR ticket verification
- Deployment and testing

---

## 📌 Future Improvements

Possible future enhancements include:

- Automated email ticket delivery
- Improved booking cancellation and refund handling
- Live bus tracking
- Seat-capacity and waitlist management
- Admin-independent operational dashboards
- Booking analytics
- Push notifications
- Improved QR security and expiry validation
- Automated daily trip generation
- Better payment status reconciliation

---

## 📄 License

This project was developed for educational and institutional use.

The project may be modified or extended according to the requirements of the development team and institute.