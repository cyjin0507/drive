class search {
    constructor(data) {
        this.data = data;
        new util().drawList(this.data);
    }

    cho_hangul(str) {
        let cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i) - 44032;
            if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
        }

        return result;
    }

    
    
}