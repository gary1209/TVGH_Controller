 $(function(){
        csmapi.set_endpoint ('http://iot.iottalk.tw:9999');
        var profile = {
		    'dm_name': 'DataServer',
			'idf_list':[],
			'odf_list':[Lux_O1,Lux_O2,Lux_O3,Lux_O4,Lux_O5,Colortemp_O1],
		        'd_name': 'DataServer_TVGH',
        };
		function number_format(val, decimals){
            //Parse the value as a float value
            val = parseFloat(val);
            //Format the value w/ the specified number
            //of decimal places and return it.
            return val.toFixed(decimals);
        }
        function Lux_O1(data){
            if ($('.Lux_O1')[0]){
           $('.Lux_O1')[0].innerText=number_format(data[0],0);}}
        function Lux_O2(data){
            if ($('.Lux_O2')[0]){
           $('.Lux_O2')[0].innerText=number_format(data[0],0);}}
        function Lux_O3(data){
            if ($('.Lux_O3')[0]){
           $('.Lux_O3')[0].innerText=number_format(data[0],0);}}
        function Lux_O4(data){
            if ($('.Lux_O4')[0]){
           $('.Lux_O4')[0].innerText=number_format(data[0],0);}}
        function Lux_O5(data){
            if ($('.Lux_O5')[0]){
           $('.Lux_O5')[0].innerText=number_format(data[0],0);}}
        function Colortemp_O1(data){
            if ($('.Colortemp_O1')[0]){
            $('.Colortemp_O1')[0].innerText=number_format(data[0],0);}}
        

/*******************************************************************/                
        function ida_init(){
	    console.log(profile.d_name);
	}
        var ida = {
            'ida_init': ida_init,
        }; 
        dai(profile,ida);     
});
