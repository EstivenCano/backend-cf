const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res) => {
    res.send("API Camino flexible")
})

const route_UserRole = require('./routes/userRole')
const route_Announcements = require('./routes/Announcements')
const route_Request = require('./routes/Request')
const route_Approved = require('./routes/ApprovedStudents')

app.use(route_UserRole, route_Announcements, route_Request, route_Approved)

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Escuchando API en http://localhost:${PORT}`)
})