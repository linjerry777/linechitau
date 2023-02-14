const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const csrf = require('csurf')
const cors = require('cors')

const app = express()

// 不使用 res.render
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// CSRF Protection
const csrfProtection = csrf({
  cookie: true,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 3600, // 1-hour
})

app.use(csrfProtection)

// var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')

// use auth router(csrf, jwt, login, logout)
const authRouter = require('./routes/auth')
// demo data
const productsRouter = require('./routes/products')
// app.use('/', indexRouter)
// app.use('/users', usersRouter)

// const authRouters = require('./routes/authRouter')
// use auth router(csrf, jwt, login, logout)
app.use('/auth', authRouter)
// NOTE payment start
const paymentHotelDetail = require('./routes/payment/Detail/Hotel')
const paymentHotelCheckOut = require('./routes/payment/CheckOut/Hotel')
app.use('/api/payment/CheckOut/Hotel', paymentHotelCheckOut)
app.use('/api/payment/Detail/Hotel', paymentHotelDetail)
const paymentTravelDetail = require('./routes/payment/Detail/Travel')
const paymentTravelCheckOut = require('./routes/payment/CheckOut/Travel')
app.use('/api/payment/CheckOut/Travel', paymentTravelCheckOut)
app.use('/api/payment/Detail/Travel', paymentTravelDetail)
// NOTE payment end

// NOTE TEST TRIP
const tripTest = require('./routes/Triptest/tripTest')

app.use('/api/trip/', tripTest)
// NOTE TEST

// demo data
app.use('/products', productsRouter)

const hotelList = require('./routes/hotelList/hotelList')
app.use('/api/hotelList', hotelList)

const popularSearch = require('./routes/hotel/popularSearch')
app.use('/api/hotel', popularSearch)
const recommandToC = require('./routes/hotel/recommandToC')
app.use('/api/hotel', recommandToC)

const hotelDetail = require('./routes/hotelDetail/hotelDetail')
app.use('/api/hotelDetail', hotelDetail)
const roomDetail = require('./routes/hotelDetail/roomDetail')
app.use('/api/hotelDetail', roomDetail)
const hotelComment = require('./routes/hotelDetail/hotelComment')
app.use('/api/hotelDetail', hotelComment)
const hotelOrder = require('./routes/hotelDetail/hotelOrder')
app.use('/api/hotelDetail', hotelOrder)
const userLike = require('./routes/hotelDetail/userLike')
app.use('/api/hotelDetail', userLike)

const aroundSpots = require('./routes/aroundSpots')
app.use('/api/aroundSpots', csrfProtection, aroundSpots)

const userlist = require('./routes/user/list')
app.use('/api/userlist', userlist)
const coupon = require('./routes/coupon/coupon')
app.use('/api/coupon', coupon)
const tripList = require('./routes/tripList/tripList')
app.use('/api/tripList', tripList)
const tripDetails = require('./routes/tripProductDetails/tripDetails')
app.use('/api/tripProductDetails', tripDetails)
const planDetails = require('./routes/tripProductDetails/planDetails')
app.use('/api/tripProductDetails', planDetails)
const payRouter = require('./routes/pay')
app.use('/api/pay', payRouter)
// app.use('/register', authRouters)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.status(500).send({ error: err })
})

// app.listen(3002, () => {
//   console.log('Server running at port 3002')
// })

module.exports = app
