/**
 * Created by krinjadl on 2016-06-20.
 */
/**
 * DateVale
 * @module datevalue
 */
module.exports = {
    /** Date obj */
    date : {
        period: {
            min: new Date(),
            max: new Date()
        },
        minDate: new Date(),
        maxDate: new Date(),
        today: new Date(),
    },
    /** init date object */
    init: function (){

        this.date.period.min = new Date();
        this.date.period.max = new Date();
        this.date.minDate = new Date();
        this.date.maxDate = new Date();
        this.date.today = new Date();

        this.date.period.min.setDate(this.date.today.getDate() - 7);
        this.date.period.max.setDate(this.date.today.getDate() + 28);
        this.date.maxDate.setDate(this.date.minDate.getDate() + 6);
    },
    /** get preiod */
    getPeriodText(){
        var str;
        var minDateM = this.date.minDate.format("MMM");
        var maxDateM = this.date.maxDate.format("MMM");
        if(minDateM == maxDateM){
            str = this.date.minDate.format("dd")+" - "+this.date.maxDate.format("dd")+" "+maxDateM;
        }else{
            str = this.date.minDate.format("dd")+" "+minDateM+" - "+this.date.maxDate.format("dd")+" "+maxDateM;
        }
        return str;
    }

}