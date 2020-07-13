export const MAP_COLORS = {
    land: '#f8f9fa',
    sea: '#9ed3ed',
    park: '#9fda9d',
    trip: '#699ff3',
    text: '#5f5f5f',
};

export const MAP_ELEMENTS = {
    zoom: {
        extends: [0.7, 8]
    },
    bases: {
        main_area_font: 10,
    },
    station: {
        image_size: 10,
        info_font: 6
    },
    line: {
        width: 1.5
    },
    trip: {
        width: 3,
        ends: {
            r: 5,
            x: 0,
            y: -15,
            text_size: 5,
            border_width: 1.5
        },
        switches: {
            rx: 8,
            ry: 5,
            x: 16,
            y: -6,
            text_size: 5,
            border_width: 1.5
        },
        highlight: {
            boundary: 0.2
        }
    },
};

export const MAIN_AREAS = [
    'PULAU UBIN',
    'SENTOSA',
    'JURONG ISLAND',
    'TUAS',
    'PIONEER',
    'JURONG EAST',
    'JURONG WEST',
    'QUEENSTOWN',
    'BUKIT MERAH',
    'SINGAPORE RIVER',
    'TANGLIN',
    'KALLANG',
    'NOVENA',
    'TOA PAYOH',
    'LIM CHU KANG',
    'BUKIT BATOK',
    'CHOA CHU KANG',
    'SUNGEI KADUT',
    'WOODLANDS',
    'SEMBAWANG',
    'MANDAI',
    'YISHUN',
    'ANG MO KIO',
    'BISHAN',
    // 'WESTERN WATER CATCHMENT',
    'SENGKANG',
    'PUNGGOL',
    'SELETAR',
    'PAYA LEBAR',
    'GEYLANG',
    'BEDOK',
    'TAMPINES',
    'PASIR RIS',
    'CHANGI',
    'CHANGI BAY',
];