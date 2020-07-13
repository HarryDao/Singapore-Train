import { Path, Frequencies, TripData, PathTripSplit } from 'helpers';
import { TrainInformationData } from 'apis';

const frequencies: Frequencies = {
	"BP": 3,
	"CC": 2,
	"CE": 2,
	"CG": 3,
	"DT": 3,
	"EW": 3,
	"JE": 2,
	"JS": 2,
	"JW": 2,
	"NE": 3,
	"NS": 2,
	"PE": 3,
	"PW": 3,
	"SE": 3,
	"SW": 3,
	"TE": 3
}

export const trainInformation: TrainInformationData = {
    firstTrain: 2,
    lastTrain: 3,
    frequencies: frequencies,
    isPeak: false,
    timeSwitchBtw2Lines: 2,
    timeBtw2Stations: 2
}

export const inputs = {
    start: "Holland Village",
    end: "Chinatown",
    timeBtw2Stations: 2,
    timeSwitchBtw2Lines: 2,
    frequencies,
}

export const paths: Path[] = [
    {
     "paths": [
      {
       "path": [
        {
         "CC": {
          "from": "Holland Village",
          "fromId": 21,
          "to": "Buona Vista",
          "toId": 22
         }
        },
        {
         "EW": {
          "from": "Buona Vista",
          "fromId": 21,
          "to": "Commonwealth",
          "toId": 20
         }
        },
        {
         "EW": {
          "from": "Commonwealth",
          "fromId": 20,
          "to": "Queenstown",
          "toId": 19
         }
        },
        {
         "EW": {
          "from": "Queenstown",
          "fromId": 19,
          "to": "Redhill",
          "toId": 18
         }
        },
        {
         "EW": {
          "from": "Redhill",
          "fromId": 18,
          "to": "Tiong Bahru",
          "toId": 17
         }
        },
        {
         "EW": {
          "from": "Tiong Bahru",
          "fromId": 17,
          "to": "Outram Park",
          "toId": 16
         }
        },
        {
         "NE": {
          "from": "Outram Park",
          "fromId": 3,
          "to": "Chinatown",
          "toId": 4
         }
        }
       ],
       "time": 24,
       "lines": 3
      }
     ],
     "base": [
      "Holland Village",
      "Buona Vista",
      "Commonwealth",
      "Queenstown",
      "Redhill",
      "Tiong Bahru",
      "Outram Park",
      "Chinatown"
     ],
     "time": 24
    },
    {
     "paths": [
      {
       "path": [
        {
         "CC": {
          "from": "Holland Village",
          "fromId": 21,
          "to": "Buona Vista",
          "toId": 22
         }
        },
        {
         "CC": {
          "from": "Buona Vista",
          "fromId": 22,
          "to": "one-north",
          "toId": 23
         }
        },
        {
         "CC": {
          "from": "one-north",
          "fromId": 23,
          "to": "Kent Ridge",
          "toId": 24
         }
        },
        {
         "CC": {
          "from": "Kent Ridge",
          "fromId": 24,
          "to": "Haw Par Villa",
          "toId": 25
         }
        },
        {
         "CC": {
          "from": "Haw Par Villa",
          "fromId": 25,
          "to": "Pasir Panjang",
          "toId": 26
         }
        },
        {
         "CC": {
          "from": "Pasir Panjang",
          "fromId": 26,
          "to": "Labrador Park",
          "toId": 27
         }
        },
        {
         "CC": {
          "from": "Labrador Park",
          "fromId": 27,
          "to": "Telok Blangah",
          "toId": 28
         }
        },
        {
         "CC": {
          "from": "Telok Blangah",
          "fromId": 28,
          "to": "HarbourFront",
          "toId": 29
         }
        },
        {
         "NE": {
          "from": "HarbourFront",
          "fromId": 1,
          "to": "Outram Park",
          "toId": 3
         }
        },
        {
         "NE": {
          "from": "Outram Park",
          "fromId": 3,
          "to": "Chinatown",
          "toId": 4
         }
        }
       ],
       "time": 25,
       "lines": 2
      }
     ],
     "base": [
      "Holland Village",
      "Buona Vista",
      "one-north",
      "Kent Ridge",
      "Haw Par Villa",
      "Pasir Panjang",
      "Labrador Park",
      "Telok Blangah",
      "HarbourFront",
      "Outram Park",
      "Chinatown"
     ],
     "time": 25
    }
];

export const trip: PathTripSplit[] = [
    {
       "line":"CC",
       "stations":[
          {
             "name":"Holland Village",
             "id":21
          },
          {
             "name":"Buona Vista",
             "id":22
          }
       ]
    },
    {
       "line":"EW",
       "stations":[
          {
             "name":"Buona Vista",
             "id":21
          },
          {
             "name":"Commonwealth",
             "id":20
          },
          {
             "name":"Queenstown",
             "id":19
          },
          {
             "name":"Redhill",
             "id":18
          },
          {
             "name":"Tiong Bahru",
             "id":17
          },
          {
             "name":"Outram Park",
             "id":16
          }
       ]
    },
    {
       "line":"NE",
       "stations":[
          {
             "name":"Outram Park",
             "id":3
          },
          {
             "name":"Chinatown",
             "id":4
          }
       ]
    }
];

export const tripData: TripData = {
    "activeStations":[
        {
            "station":"Holland Village",
            "line":"CC",
            "coords":[
            103.795744,
            1.312117
            ]
        },
        {
            "station":"Buona Vista",
            "line":"EW",
            "coords":[
            103.790838,
            1.30719
            ]
        },
        {
            "station":"Commonwealth",
            "line":null,
            "coords":[
            103.798308,
            1.302443
            ]
        },
        {
            "station":"Queenstown",
            "line":null,
            "coords":[
            103.806052,
            1.294552
            ]
        },
        {
            "station":"Redhill",
            "line":null,
            "coords":[
            103.816757,
            1.289653
            ]
        },
        {
            "station":"Tiong Bahru",
            "line":null,
            "coords":[
            103.827642,
            1.286095
            ]
        },
        {
            "station":"Outram Park",
            "line":"NE",
            "coords":[
            103.840241,
            1.280685
            ]
        },
        {
            "station":"Chinatown",
            "line":"NE",
            "coords":[
            103.844003,
            1.28502
            ]
        }
    ],
    "tripCoords":[
        [
            [
            103.79575,
            1.3121
            ],
            [
            103.7946,
            1.3113
            ],
            [
            103.79246,
            1.30984
            ],
            [
            103.79181,
            1.30894
            ],
            [
            103.79087,
            1.30717
            ]
        ],
        [
            [
            103.79826,
            1.30239
            ],
            [
            103.79774,
            1.30286
            ],
            [
            103.79749,
            1.30306
            ],
            [
            103.79724,
            1.30333
            ],
            [
            103.79702,
            1.30354
            ],
            [
            103.7963,
            1.30418
            ],
            [
            103.7947,
            1.30561
            ],
            [
            103.79431,
            1.30597
            ],
            [
            103.79406,
            1.30617
            ],
            [
            103.79381,
            1.30636
            ],
            [
            103.79359,
            1.3065
            ],
            [
            103.79325,
            1.30667
            ],
            [
            103.79277,
            1.30685
            ],
            [
            103.79237,
            1.30694
            ],
            [
            103.79198,
            1.307
            ],
            [
            103.79139,
            1.30706
            ],
            [
            103.79083,
            1.30711
            ]
        ],
        [
            [
            103.80601,
            1.29452
            ],
            [
            103.80561,
            1.29514
            ],
            [
            103.80543,
            1.29542
            ],
            [
            103.80536,
            1.29557
            ],
            [
            103.80495,
            1.29632
            ],
            [
            103.80459,
            1.29679
            ],
            [
            103.8043,
            1.29709
            ],
            [
            103.80349,
            1.29781
            ],
            [
            103.80155,
            1.29952
            ],
            [
            103.80099,
            1.30004
            ],
            [
            103.79988,
            1.30102
            ],
            [
            103.79947,
            1.30137
            ],
            [
            103.7991,
            1.30167
            ],
            [
            103.79906,
            1.30171
            ],
            [
            103.79875,
            1.30196
            ],
            [
            103.79826,
            1.30239
            ]
        ],
        [
            [
            103.81673,
            1.28959
            ],
            [
            103.81611,
            1.2899
            ],
            [
            103.8157,
            1.29011
            ],
            [
            103.81537,
            1.29025
            ],
            [
            103.81504,
            1.29035
            ],
            [
            103.81424,
            1.2905
            ],
            [
            103.8106,
            1.29107
            ],
            [
            103.81016,
            1.29113
            ],
            [
            103.8099,
            1.29118
            ],
            [
            103.80961,
            1.29125
            ],
            [
            103.80939,
            1.29133
            ],
            [
            103.80918,
            1.29142
            ],
            [
            103.80895,
            1.29154
            ],
            [
            103.80869,
            1.29168
            ],
            [
            103.80839,
            1.2919
            ],
            [
            103.80745,
            1.29274
            ],
            [
            103.80703,
            1.29312
            ],
            [
            103.80682,
            1.29335
            ],
            [
            103.80661,
            1.2936
            ],
            [
            103.80632,
            1.29402
            ],
            [
            103.80601,
            1.29452
            ]
        ],
        [
            [
            103.82764,
            1.28605
            ],
            [
            103.82744,
            1.28605
            ],
            [
            103.82717,
            1.28608
            ],
            [
            103.82511,
            1.28658
            ],
            [
            103.82482,
            1.28674
            ],
            [
            103.82267,
            1.28833
            ],
            [
            103.82237,
            1.28851
            ],
            [
            103.82204,
            1.28859
            ],
            [
            103.82166,
            1.28866
            ],
            [
            103.82106,
            1.28869
            ],
            [
            103.82048,
            1.28873
            ],
            [
            103.81997,
            1.28875
            ],
            [
            103.81972,
            1.28876
            ],
            [
            103.81901,
            1.28878
            ],
            [
            103.81873,
            1.28881
            ],
            [
            103.81835,
            1.28888
            ],
            [
            103.81798,
            1.28898
            ],
            [
            103.81772,
            1.2891
            ],
            [
            103.81736,
            1.28927
            ],
            [
            103.81673,
            1.28959
            ]
        ],
        [
            [
            103.84018,
            1.28063
            ],
            [
            103.84002,
            1.2808
            ],
            [
            103.83954,
            1.28119
            ],
            [
            103.83606,
            1.28339
            ],
            [
            103.83542,
            1.28382
            ],
            [
            103.83484,
            1.28442
            ],
            [
            103.83341,
            1.28592
            ],
            [
            103.83303,
            1.2861
            ],
            [
            103.83277,
            1.28613
            ],
            [
            103.82764,
            1.28605
            ]
        ],
        [
            [
            103.84024,
            1.28069
            ],
            [
            103.84357,
            1.28444
            ],
            [
            103.844,
            1.28503
            ]
        ]
    ],
    "boundaryCoords":{
        "x0":103.79083,
        "y0":1.28063,
        "x1":103.844,
        "y1":1.3121
    },
    "ends":[
        {
            "station":"Holland Village",
            "line":"CC",
            "coords":[
            103.795744,
            1.312117
            ]
        },
        {
            "station":"Chinatown",
            "line":"NE",
            "coords":[
            103.844003,
            1.28502
            ]
        }
    ],
    "switches":[
        {
            "station":"Holland Village",
            "line":"CC",
            "coords":[
            103.795744,
            1.312117
            ]
        },
        {
            "station":"Buona Vista",
            "line":"EW",
            "coords":[
            103.790838,
            1.30719
            ]
        },
        {
            "station":"Outram Park",
            "line":"NE",
            "coords":[
            103.840241,
            1.280685
            ]
        }
    ]
}
    