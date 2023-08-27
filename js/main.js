$(document).ready(function(){
    
    var defaultBG = "#00C25E";
    //To deal with the changing RGB HEX values due to hsl's higher precision
    var hsl = ""; 
    var hexData = "";

    resetColor()
    //For creating Placeholder like effect ////////////////////////////////////////////////////////
    
    if (!$("#rgb").val()) {
        $("#rgb").val("rgb");
        $("#rgbWarn").hide();
    }
    if (!$("#hex").val()) {
        $("#hex").val("hex");
        $("#hexWarn").hide();
    }
    if (!$("#hsl").val()) {
        $("#hsl").val("hsl");
        $("#hslWarn").hide();
    }
    
    $(".inputcolor").blur(function(){
        if (!$("#rgb").val()) {
            $("#rgb").val("rgb");
            $("#rgbWarn").hide();
        }
        if (!$("#hex").val()) {
            $("#hex").val("hex");
            $("#hexWarn").hide();
        }
        if (!$("#hsl").val()) {
            $("#hsl").val("hsl");
            $("#hslWarn").hide();
        }
    });
    
    $(".inputcolor").focus(function(){
        if ($(this).val()=="rgb" || $(this).val()=="hex" || $(this).val()=="hsl") {
            $(this).val("");
        }
    });
    
    //HEX RGB conversion /////////////////////////////////////////////////////////////////
    
    $("#rgb").on("keyup change",function(){
        
        var rgbData = $(this).val()
        
        //Check if format is rgb(1,2,3) or (1,2,3) or 1,2,3
        
        if(rgbData.match(/\s*rgb\s*\(\s*[0-9]+\s*\,\s*[0-9]+\s*,\s*[0-9]+\s*\)/i) == rgbData ||
        rgbData.match(/\s*\(\s*[0-9]+\s*\,\s*[0-9]+\s*\,\s*[0-9]+\s*\)\s*/) == rgbData ||
        rgbData.match(/\s*[0-9]+\s*\,\s*[0-9]+\s*\,\s*[0-9]+\s*/) == rgbData)
        {
            var rgbArr = rgbData.match(/[0-9]+/g);
            if(rgbArr[0] >= 0 && rgbArr[1] >= 0 && rgbArr[2] >= 0 && rgbArr[0] <= 255 && rgbArr[1] <= 255 && rgbArr[2] <= 255){

                hexData = rgb2hex(rgbData);
                hslData = rgb2hsl(rgbData);
                    
                $("#rgbWarn").hide();
                $("#hex").val(hexData);
                
                $("#hsl").val(hslData);
                hsl = hslData;
                
                $("#mainContainer").css("background-color",hexData);
                $("#colorpicker").val(hexData);
                setTextColor(hexData);
                
            }
            else{
                if(rgbData.length > 4 ){
                    $("#rgbWarn").show();
                }
                $("#hex").val("hex");
                $("#hexWarn").hide();
                $("#hsl").val("hsl");
                $("#hslWarn").hide();
                resetColor();
            }
        }
        else{
            // GIVE ERROR MESSAGE FOR WRONG FORMAT
            if(rgbData.length > 4 ){
                    $("#rgbWarn").show();
            }
            $("#hex").val("hex");
            $("#hexWarn").hide();
            $("#hsl").val("hsl");
            $("#hslWarn").hide();
            resetColor();
        }
    });
    
    $("#hex").on("keyup change",function(){
        hexData = $(this).val();
        
        //Check if format is #123 or #112233
        
        if(hexData.match(/#?[0-9a-f]{3}/i) == hexData ||
        hexData.match(/#?[0-9a-f]{6}/i) == hexData)
        {
            if(hexData[0] != "#"){
                hexData = "#"+hexData;
                $("#hex").val(hexData);
                
            }
            if(hexData.length == 4 ){ //length is 4 including the #
                var hexData = "#"+hexData[1]+hexData[1]+hexData[2]+hexData[2]+hexData[3]+hexData[3];
            }
            
            rgbData = hex2rgb(hexData);
            hslData = rgb2hsl(rgbData);
            
            $("#hexWarn").hide();
            $("#rgb").val(rgbData);
            
            $("#hsl").val(hslData);
            hsl = hslData;
            
            $("#mainContainer").css("background-color",hexData);
            $("#colorpicker").val(hexData);
            setTextColor(hexData);
        }
        else{
            // GIVE ERROR MESSAGE FOR WRONG FORMAT
            if(hexData.length > 1 ){
                    $("#hexWarn").show();
            }
            $("#rgb").val("rgb");
            $("#hsl").val("hsl");
            $("#rgbWarn").hide();
            $("#hslWarn").hide();
            resetColor();
        }
    });
    
    $("#hsl").on("keyup change",function(){
        
        var hslData = $(this).val();
        
        //Check if format is hsl(1,2%,3%) or (1,2%,3%) or 1,2%,3%
        if(hslData != hsl){
            if(hslData.match(/\s*hsl\s*\(\s*[0-9]+\s*\,\s*[0-9]+\s*\%?\s*\,\s*[0-9]+\s*\%?\s*\)\s*/i) == hslData ||
            hslData.match(/\s*\(\s*[0-9]+\s*\,\s*[0-9]+\s*\%?\s*\,\s*[0-9]+\s*\%?\s*\)\s*/) == hslData ||
            hslData.match(/\s*[0-9]+\s*\,\s*[0-9]+\s*\%?\s*\,\s*[0-9]+\s*\%?\s*/) == hslData)
            {
                var hslArr = hslData.match(/[0-9]+/g);
                if(hslArr[0] >= 0 && hslArr[1] >= 0 && hslArr[2] >= 0 && hslArr[0] <= 360 && hslArr[1] <= 100 && hslArr[2] <= 100){

                    hexData = rgb2hex(hsl2rgb(hslData));
                    rgbData = hsl2rgb(hslData);
                    if(!(hslData.match(/\s*hsl\s*\(\s*[0-9]+\s*\,\s*[0-9]+\s*\%\s*\,\s*[0-9]+\s*\%\s*\)\s*/i))){
                        hslData = "hsl("+hslArr[0]+","+hslArr[1]+"%,"+hslArr[2]+"%)"
                    }
                    
                    $("#hslWarn").hide();
                    $("#hex").val(hexData);
                    $("#rgb").val(rgbData);
                    
                    $("#mainContainer").css("background-color",hexData);
                    $("#colorpicker").val(hexData);
                    setTextColor(hexData);

                }
                else{
                    if(hslData.length > 4 ){
                        $("#hslWarn").show();
                    }
                    $("#hex").val("hex");
                    $("#rgb").val("rgb");
                    $("#hexWarn").hide();
                    $("#rgbWarn").hide();
                    hsl = hslData;
                    resetColor();
                }
            }
            else{
                // GIVE ERROR MESSAGE FOR WRONG FORMAT
                if(hslData.length > 4 ){
                        $("#hslWarn").show();
                }
                $("#hex").val("hex");
                $("#rgb").val("rgb");
                $("#hexWarn").hide();
                $("#rgbWarn").hide();
                hsl = hslData;
                resetColor();
            }
        }
    });

    $("#colorpicker").on("input change", function (){
        // $("#mainContainer").css("background-color",hexData);
        hexData = $(this).val();
        $("#hex").val(hexData);
        $("#hex").trigger("change");

    });
    
    function setTextColor(colorData){
        var textColor;
        if(colorData[0]=="#"){
            //convert to RGB
            textColor = hex2rgb(colorData);
        }
        else if(colorData[0]="h"){
            textColor = hsl2rgb(colorData);
        }
        else{
            textColor = colorData;
        }
        textColor = textColor.match(/[0-9]+/g)
        brightness = (textColor[0]*299 + textColor[0]*587 + textColor[0]*114)/1000 ;
        
        if(brightness < 125){
            //white text
            $(".inputcolor").css("color","white");
        }
        else{
            //black text
            $(".inputcolor").css("color","black");
        }
    }
    
    function resetColor(){
        $("#mainContainer,#hex,#rgb,#hsl").css("color","black");
        $("#mainContainer").css("background-color",defaultBG);
    }
    
    
//CSS Stuff /////////////////////////////////////////////////////
    
    function hex2rgb(hexColor){
        rgbColor = "rgb(";
            
        for(i=0;i<3;i++){
            rgbColor += parseInt(hexColor.substr((i*2)+1,2),16);
            if(i < 2){
                rgbColor += ",";
            }
        }

        rgbColor += ")";
        
        return rgbColor;
    }
    
    function rgb2hex(rgbColor){
        var rgbArr = rgbColor.match(/[0-9]+/g);

        var hexColor = "#";

        rgbArr.forEach(function(value,key){
            hvalue = parseInt(value).toString(16);

            //padding single digit number with a 0
            if(value < 16){
                hvalue = "0"+hvalue;
            }
            hexColor += hvalue;
        });
        return (hexColor).toUpperCase()
        
    }
    
    function rgb2hsl(rgbColor){
        var rgbArr = rgbColor.match(/[0-9]+/g);
        var varH=0,varS=0,varL=0;
        
        varR = rgbArr[0]/255;
        varG = rgbArr[1]/255;
        varB = rgbArr[2]/255;
        varMin = Math.min(varR,varG,varB);
        varMax = Math.max(varR,varG,varB);
        varDeltaMax = varMax - varMin;
        varL = (varMax + varMin)/2;
        
        if(varDeltaMax == 0){
            varH = 0;
            varS = 0;
        }
        else{
            if(varL < 0.5){
                varS = varDeltaMax / (varMax + varMin);
            }
            else{
                varS = varDeltaMax / (2 - varMax - varMin);
            }
            
            deltaR = (((varMax - varR)/6)+(varDeltaMax/2))/varDeltaMax;
            deltaG = (((varMax - varG)/6)+(varDeltaMax/2))/varDeltaMax;
            deltaB = (((varMax - varB)/6)+(varDeltaMax/2))/varDeltaMax;
            
            if(varR == varMax){
                varH = deltaB - deltaG;
            }
            else if(varG == varMax){
                varH = (1/3) + deltaR - deltaB;
            }
            else if(varB == varMax){
                varH = (2/3) + deltaG - deltaR;
            }
            
            if(varH < 0){
                varH += 1;
            }
            if(varH > 1){
                varH -= 1;
            }
        }
        
        hslColor = "hsl(" + Math.round(varH*360) + "," + Math.round(varS*100) + "%," + Math.round(varL*100) + "%)"
        
        return hslColor;
    }
    
    function hsl2rgb(hslColor){
        
        var R=0,G=0,B=0;
        
        hslArr = hslColor.match(/[0-9]+/g);
        var H = hslArr[0] / 360;
        var S = hslArr[1] / 100;
        var L = hslArr[2] / 100;
        
        hue2rgb = function(v1,v2,vH){
            if ( vH < 0 ) vH += 1
            if ( vH > 1 ) vH -= 1
            if ( ( 6 * vH ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * vH )
            if ( ( 2 * vH ) < 1 ) return ( v2 )
            if ( ( 3 * vH ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )
            return v1;
        }
        
        if ( S == 0 )
        {
           R = L * 255
           G = L * 255
           B = L * 255
        }
        else
        {
           if ( L < 0.5 ) var_2 = L * ( 1 + S )
           else           var_2 = ( L + S ) - ( S * L )

           var_1 = 2 * L - var_2

           R = 255 * hue2rgb( var_1, var_2, H + ( 1 / 3 ) ) 
           G = 255 * hue2rgb( var_1, var_2, H )
           B = 255 * hue2rgb( var_1, var_2, H - ( 1 / 3 ) )
        }
        
        return "rgb("+Math.round(R)+","+Math.round(G)+","+Math.round(B)+")";
    }
    
    $('.tweet').click(function(e) {
    var width = 575,
        height = 400,
        left = ($(window).width() - width) / 2,
        top = ($(window).height() - height) / 2,
        url = this.href,
        opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

    window.open(url, 'twitter', opts);

    return false;
  });

});
    
