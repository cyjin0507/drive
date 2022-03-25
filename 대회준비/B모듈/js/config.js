// 모든 시간 상수는 초 단위로 씀
// START_COUNTDOWN : 시작하기 전 카드 확인 시간 
// GAME_PLAY_TIME : 카드 확인 시간이 종료된 후 게임 플레이 시간
// CARD_ACTIVE_TIME : 카드를 뒤집었을때 다시 뒤집기까지의 시간
// CARD_ROTATE_TIME : 카드가 회전하는 시간(실제로 회전 시간을 변경하려면 css에서 바꿔야함)
// HINT_TIME : 힌트보기 버튼을 눌렀을때 힌트를 보여주고 다시 뒤집히기 전까지의 시간
const TIMEDATA = {
    START_COUNTDOWN : 1,
    GAME_PLAY_TIME : 1,
    CARD_ACTIVE_TIME : 3,
    CARD_ROTATE_TIME : 0.5,
    HINT_TIME : 3
}

// 특산품 이미지 파일의 이름
// 지역명은 '_'을 기준으로 잘라서 얻으면 되기 때문에 따로 저장 X
const SPECIALTY = [
    '거제시_유자.jpg',
    '거창군_사과.jpg',
    '고성군_방울토마토.jpg',
    '김해시_단감.jpg',
    '남해군_마늘.jpg',
    '의령군_수박.jpg',
    '양산시_매실.jpg',
    '산청군_약초.jpg',
    '사천시_멸치.jpg',
    '밀양시_대추.jpg',
    '합천군_돼지고기.jpg',
    '함양군_밤.jpg',
    '함안군_곶감.jpg',
    '하동군_녹차.jpg',
    '통영시_굴.jpg',
    '창원시_풋고추.jpg',
    '창녕군_양파.jpg',
    '진주시_고추.jpg',
];