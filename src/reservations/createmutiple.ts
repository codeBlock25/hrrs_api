import { internal } from "@hapi/boom";
import { ResponseToolkit } from "@hapi/hapi";
import { BedSpaceType, ReservationModel } from "./model";

const rooms: {
  hostel_name: string;
  allocations: {
    name: string;
    rooms: string[];
  }[];
}[] = [
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

export const createMultipleReservationsHandler = async (
  _req: Request,
  h: ResponseToolkit
) => {
  try {
    rooms.map(async (room) => {
      await room.allocations.map(async (_room) => {
        await _room.rooms.map(async (__room) => {
          [
            BedSpaceType.secA,
            BedSpaceType.secB,
            BedSpaceType.secC,
            BedSpaceType.secD,
          ].map(async (space) => {
            await new ReservationModel({
              hostel_name: room.hostel_name,
              floor: _room.name,
              room_name: `RM-${__room}`,
              bed_space: space,
              date: new Date(),
            }).save();
          });
        });
      });
    });
    return h.response({ message: "done" });
  } catch (error) {
    console.log({ error });
    return internal(JSON.stringify(error));
  }
};
