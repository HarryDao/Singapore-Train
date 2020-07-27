module.exports = {
    // SOCKET_PATH: '/singapore-train-socket',
    TIME_ZONE_OFFSET: 8,
    TRAIN_CONFIGS: {
        BROADCAST_INTERVALS_IN_MINUTES: 5,
        FIRST_TRAIN: 5.5,
        LAST_TRAIN: 23,
        PEAK_HOURS: [
            {
                from: 7,
                to: 9
            },
            {
                from: 17,
                to: 19
            }
        ],
        FREQUENCY: {
            peak: [2, 3],
            off_peak: [5, 7]
        },
        TIME_BTW_2_STATIONS: 2,
        TIME_BTW_2_LINES: 2,
    },
    MRT_LINES: [
        'JS',
        'JE',
        'JW',
        'CE',
        'TE',
        'NS',
        'EW',
        'BP',
        'CC',
        'DT',
        'NE',
        'CG',
        'SE',
        'SW',
        'PE',
        'PW'
    ]
}