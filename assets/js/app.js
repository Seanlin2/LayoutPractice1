var Main = new Vue({
        el: "#main",
        data: {
          num:2,
          nowDTlength:2,
          DT: [{
            Id:0,
            text:'',
          }],
          BBDT: [{Id:1},{Id:2},{Id:3},{Id:4}],
          sList:['bgbox','BBbox']
        },
        created: function () {
          this.Init();
          this.Hideall()
        },
        methods: {
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
