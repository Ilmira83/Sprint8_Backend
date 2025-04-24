"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = exports.postBooking = exports.deleteBooking = exports.getBooking = exports.getBookings = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listBookings = yield booking_1.default.findAll();
    res.json(listBookings);
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const booking = yield booking_1.default.findByPk(id);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({
            msg: `Booking with id ${id} doesn't exist`
        });
    }
});
exports.getBooking = getBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const booking = yield booking_1.default.findByPk(id);
    if (booking) {
        yield booking.destroy();
        res.json({
            msg: `Booking with id ${id} deleted`
        });
    }
    else {
        res.status(404).json({
            msg: `Booking with id ${id} doesn't exist`
        });
    }
});
exports.deleteBooking = deleteBooking;
const postBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield booking_1.default.create(body);
        res.json({
            msg: 'Booking was created',
            body
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Mistake occured, communicate with support team.',
        });
    }
});
exports.postBooking = postBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const booking = yield booking_1.default.findByPk(id);
    try {
        if (booking) {
            yield booking.update(body);
            res.json({
                msg: `Booking with id ${id} was updated`,
            });
        }
        else {
            res.status(404).json({
                msg: `Booking with id ${id} doesn't exist`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Mistake occured, communicate with support team.',
        });
    }
});
exports.updateBooking = updateBooking;
