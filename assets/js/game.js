var game = {
    w1:38,
    wc1:6,
    w2:8,
    wc2:1,
    li: [],
    sp: 1,
    Go: function () {
        game.li = [];
        while (game.li.length < game.wc1) {
            let n = game.Ran(game.w1);
            if (!game.li.includes(n)) {
                game.li.push(n);
            }
        }
        game.sp = game.Ran(game.w2);
        game.Print();
    },
    Print: function () {
        console.log("6: " + game.li);
        console.log("sp: " + game.sp);
    },
    Ran: function (e) {
        return Math.floor((Math.random() * e) + 1);
    }
} 
