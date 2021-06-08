"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModel = exports.BedSpaceType = void 0;
var mongoose_1 = require("mongoose");
var BedSpaceType;
(function (BedSpaceType) {
    BedSpaceType[BedSpaceType["secA"] = 0] = "secA";
    BedSpaceType[BedSpaceType["secB"] = 1] = "secB";
    BedSpaceType[BedSpaceType["secC"] = 2] = "secC";
    BedSpaceType[BedSpaceType["secD"] = 3] = "secD";
})(BedSpaceType = exports.BedSpaceType || (exports.BedSpaceType = {}));
var reservationSchema = new mongoose_1.Schema({
    hostel_name: {
        type: String,
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    room_name: {
        type: String,
        required: true,
    },
    bed_space: {
        type: BedSpaceType,
        required: true,
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    date: {
        type: Date,
        default: new Date(),
        required: true,
    },
});
exports.ReservationModel = mongoose_1.model("reservation", reservationSchema);
