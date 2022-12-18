require('dotenv').config();
const Order = require('../models/Order');
const midtransClient = require('midtrans-client');

// Create Core API i2nstance
let coreAPI = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : process.env.SERVER_KEY,
    clientKey : process.env.CLIENT_KEY
});

exports.getAllOrders= async(req, res, next) => {
    await Order.find().then( data => {
        res.status(200).json({
            pesan: "Berhasil disimpan",
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            pesan: "Gagal tampil",
            data: []
        })
    })
}

exports.createOrder = async(req, res, next) => {
    await coreAPI.charge(req.body).then((chargeResponse) => {
        console.log('chargeResponse:', JSON.stringify(chargeResponse));

        const dataOrder = {
            id: chargeResponse.order_id,
            hotel: req.body.hotel,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            room: req.body.room,
            guest: req.body.guest,
            fullName: req.body.fullName,
            identifyNumber: req.body.identifyNumber,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: req.body.address,
            notes: req.body.notes,
            paymentMethod: req.body.paymentMethod,
            promoCode: req.body.promoCode,
            response_midtrans: JSON.stringify(chargeResponse) 
        }
        Order.create(dataOrder).then(data => {
            res.status(201).json({
                pesan: "Berhasil Order",
                data: data
            })
        }).catch(err => {
            res.status(500).json({
                pesan: "Gagal order" + err.message,
                data: []
            })
        })
    }).catch((e)=> {
        res.status(500).json({
            pesan: "Gagal order" + e.message,
            data: []
        })
    })
}

exports.getOrderById = async(req, res, next) => {
    coreAPI.transaction.status(req.params.transaction_id)
    .then((response)=>{
        const responseMidtrans = JSON.stringify(response);
        Order.findOneAndUpdate({ response_midtrans:responseMidtrans }, {
            where: {id: req.params.transaction_id}
        }).then(() => {
            res.status(200).json({
                pesan: "Berhasi; cek status",
                data: response
            })
        }).catch(err => {
            res.status(500).json({
                pesan: "Gagal cek status: " + err.messages,
                data: []
            })
        })    
    });
}
