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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservationsHandler = void 0;
var boom_1 = require("@hapi/boom");
var model_1 = require("./model");
var rooms = [
    {
        hostel_name: "prof dora A. girl's hostel",
        allocations: [
            {
                name: "ground floor",
                rooms: [
                    "100",
                    "101",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "109",
                    "120",
                    "121",
                    "122",
                    "123",
                    "124",
                ],
            },
            {
                name: "first floor",
                rooms: [
                    "200",
                    "201",
                    "202",
                    "203",
                    "204",
                    "205",
                    "206",
                    "207",
                    "208",
                    "209",
                    "210",
                    "211",
                    "212",
                    "213",
                    "214",
                    "215",
                    "216",
                    "217",
                    "218",
                    "219",
                    "220",
                    "221",
                    "222",
                    "223",
                    "224",
                    "225",
                    "226",
                    "227",
                    "228",
                    "229",
                    "230",
                    "231",
                    "232",
                    "233",
                    "234",
                    "235",
                    "236",
                    "237",
                    "238",
                    "239",
                    "240",
                    "241",
                ],
            },
            {
                name: "second floor",
                rooms: [
                    "300B",
                    "301",
                    "302",
                    "303",
                    "304",
                    "305",
                    "306",
                    "307",
                    "308",
                    "309",
                    "310",
                    "311",
                    "312",
                    "313",
                    "314",
                    "315",
                    "316",
                    "317",
                    "318",
                    "319",
                    "320",
                    "321",
                    "322",
                    "323",
                    "324",
                    "325",
                    "326",
                    "327",
                    "328",
                    "329",
                    "330",
                    "331",
                    "332",
                    "333",
                    "334",
                    "335",
                    "336",
                    "337",
                    "338",
                    "339",
                    "340",
                    "341",
                ],
            },
        ],
    },
    {
        hostel_name: "stella okoli girls hostel",
        allocations: [
            {
                name: "ground floor",
                rooms: [
                    "100",
                    "101",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "118",
                    "119",
                    "120",
                    "121",
                    "122",
                    "123",
                    "124",
                ],
            },
            {
                name: "first floor",
                rooms: [
                    "200A",
                    "201",
                    "202",
                    "203",
                    "204",
                    "205",
                    "206",
                    "207",
                    "208",
                    "209",
                    "210",
                    "211",
                    "212",
                    "213",
                    "214",
                    "215",
                    "216",
                    "217",
                    "218",
                    "219",
                    "220",
                    "221",
                    "222",
                    "223",
                    "224",
                    "225",
                    "226",
                    "227",
                    "228",
                    "229",
                    "230",
                    "231",
                ],
            },
            {
                name: "second floor",
                rooms: [
                    "300A",
                    "301",
                    "302",
                    "303",
                    "304",
                    "305",
                    "306",
                    "307",
                    "308",
                    "309",
                    "310",
                    "311",
                    "312",
                    "313",
                    "314",
                    "315",
                    "316",
                    "317",
                    "318",
                    "319",
                    "320",
                    "321",
                    "322",
                    "323",
                    "324",
                    "325",
                    "326",
                    "327",
                    "328",
                    "329",
                    "330",
                    "331",
                    "332",
                    "333",
                    "334",
                    "335",
                    "336",
                    "337",
                    "338",
                    "339",
                    "340",
                    "341",
                ],
            },
        ],
    },
    {
        hostel_name: "basil a oli boys hostel",
        allocations: [
            {
                name: "ground floor",
                rooms: [
                    "100D",
                    "101",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "119",
                    "120",
                    "121",
                    "122",
                    "123",
                    "124",
                ],
            },
            {
                name: "first floor",
                rooms: [
                    "200D",
                    "201",
                    "202",
                    "203",
                    "204",
                    "205",
                    "206",
                    "207",
                    "208",
                    "209",
                    "210",
                    "211",
                    "212",
                    "213",
                    "214",
                    "215",
                    "216",
                    "217",
                    "218",
                    "219",
                    "220",
                    "221",
                    "222",
                    "223",
                    "224",
                    "225",
                    "226",
                    "227",
                    "228",
                    "229",
                    "230",
                    "231",
                    "232",
                    "233",
                    "234",
                    "235",
                    "236",
                    "237",
                    "238",
                    "239",
                    "240",
                    "241",
                ],
            },
            {
                name: "second floor",
                rooms: [
                    "300D",
                    "301",
                    "302",
                    "303",
                    "304",
                    "305",
                    "306",
                    "307",
                    "308",
                    "309",
                    "310",
                    "311",
                    "312",
                    "313",
                    "314",
                    "315",
                    "316",
                    "317",
                    "318",
                    "319",
                    "320",
                    "321",
                    "322",
                    "323",
                    "324",
                    "325",
                    "326",
                    "327",
                    "328",
                    "329",
                    "330",
                    "331",
                    "332",
                    "333",
                    "334",
                    "335",
                    "336",
                    "337",
                    "338",
                    "339",
                    "340",
                    "341",
                ],
            },
        ],
    },
    {
        hostel_name: "hostel e boys hostel",
        allocations: [
            {
                name: "ground floor",
                rooms: [
                    "100E",
                    "101",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "109",
                    "119",
                    "120",
                    "121",
                    "122",
                    "123",
                    "124",
                    "125",
                ],
            },
            {
                name: "first floor",
                rooms: [
                    "200E",
                    "201",
                    "202",
                    "203",
                    "204",
                    "205",
                    "206",
                    "207",
                    "208",
                    "209",
                    "210",
                    "211",
                    "212",
                    "213",
                    "214",
                    "215",
                    "216",
                    "217",
                    "218",
                    "219",
                    "220",
                    "221",
                    "222",
                    "223",
                    "224",
                    "225",
                    "226",
                    "227",
                    "228",
                    "229",
                    "230",
                    "231",
                    "232",
                    "233",
                    "234",
                    "235",
                    "236",
                    "237",
                    "238",
                    "239",
                    "240",
                    "241",
                ],
            },
            {
                name: "second floor",
                rooms: [
                    "300E",
                    "301",
                    "302",
                    "303",
                    "304",
                    "305",
                    "306",
                    "307",
                    "308",
                    "309",
                    "310",
                    "311",
                    "312",
                    "313",
                    "314",
                    "315",
                    "316",
                    "317",
                    "318",
                    "319",
                    "320",
                    "321",
                    "322",
                    "323",
                    "324",
                    "325",
                    "326",
                    "327",
                    "328",
                    "329",
                    "330",
                    "331",
                    "332",
                    "333",
                    "334",
                    "335",
                    "336",
                    "337",
                    "338",
                    "339",
                    "340",
                    "341",
                ],
            },
        ],
    },
];
var createReservationsHandler = function (req, h) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            rooms.map(function (room) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, room.allocations.map(function (_room) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, _room.rooms.map(function (__room) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4, [
                                                                model_1.BedSpaceType.secA,
                                                                model_1.BedSpaceType.secB,
                                                                model_1.BedSpaceType.secC,
                                                                model_1.BedSpaceType.secD,
                                                            ].map(function (space) { return __awaiter(void 0, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    new model_1.ReservationModel({
                                                                        hostel_name: room.hostel_name,
                                                                        floor: _room.name,
                                                                        room_name: "RM-" + __room,
                                                                        bed_space: space,
                                                                        date: new Date(),
                                                                    }).save();
                                                                    return [2];
                                                                });
                                                            }); })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2];
                                                    }
                                                });
                                            }); })];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
            return [2, h.response({ message: "done" })];
        }
        catch (error) {
            console.log({ error: error });
            return [2, boom_1.internal(JSON.stringify(error))];
        }
        return [2];
    });
}); };
exports.createReservationsHandler = createReservationsHandler;
