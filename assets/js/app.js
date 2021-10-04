var Main = new Vue({
        el: "#main",
        data: {
          num:5,
          arr2:[1,2,5],
          num2:11,
          result2:0,
          num3:3,
          result3:[1],    
          nowDTlength:2,
          DT: [{
            Id:0,
            text:'',
          }],
          BBDT: [{Id:1},{Id:2},{Id:3},{Id:4},{Id:5}],
          sList:['bgbox','BBbox','mwbox','pmbox','forscrollout']
        },
        created: function () {
          this.Init();
          this.Hideall()
          //ScrollOut
          ScrollOut({
                /* options */
          });
        },
        methods: {
          Fun3:function(){
            this.result3=getRow(this.num3);
          },
          Fun2:function(){
            this.result2=coinChange(this.arr2,this.num2);
          },
          Hideall: function(){
            this.sList.forEach(e => $('#' + e).hide());   
          },
          Show: function(e){                  
            if(!isNaN(e) && this.sList[e-1]!= undefined){
                var x = $('#' + this.sList[e-1]);    
                if(x.css('display') == 'none')
                {
                    $('#' + this.sList[e-1]).show()
                }else{
                    $('#' + this.sList[e-1]).hide()
                }                
            }
          },        
          Init: function() {
            var v = this;
            for(i=0;i<v.num;i++){
              this.DT[i] = this.NewItem(i+1,'one');
            } 
          },
          Add: function(){
            var v = this;
            var nowlength = v.DT.length;
            v.DT.push(v.NewItem( nowlength +1 ,'two'));
            v.num = v.DT.length;
          },          
          Minus: function(){
            var v = this;
            v.DT.pop();
            v.num = v.DT.length;
          },
          Change: function(){
            var v = this;
            var tDTL= v.DT.length;
            var tnum= v.num;
            
            console.log('change :' + tDTL + ' to ' + tnum);
            
            if(tnum > tDTL){
              for(i=0;i< (tnum - tDTL);i++){
                v.Add();
              }   
            }else{
              for(i=0;i< (tDTL - tnum);i++){
                v.Minus();
              }
            }            
          },
          NewItem: function(Id,text){
            var newitem = {
              Id: Id,
              text: text
            };            
            return newitem;
          }
        }
      });


/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let arr = [];    
    for(let i = 0; i<= rowIndex; i++){
        arr.push(C(rowIndex,i));
    }
    return arr;
};

function C(n,c){
    return NG(n,c)/NG(c,c);
}

function NG(n,c){    
    let k = 1;
    for(let i = n; i> (n-c); i--){
        k *= i; 
    }    
    return k;
}

var coinChange = function(coins, amount) {
    if (!amount || !coins.length) {
        return 0;
    }
    
    let out = [0]; 
    let i, l;      
    let index = 1; 
    
    while (!out[amount]) {
        out[index] = Infinity; 
        for (i = 0, l = coins.length; i < l; i++) {           
            
            if (coins[i] <= index) {
                out[index] = Math.min(out[index], 1 + out[index - coins[i]]);
            } 
            
        }
        index++;   
    }
    
    return out[amount] === Infinity ? -1 : out[amount];
};
