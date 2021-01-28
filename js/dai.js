const dai = function (profile, ida) {
    var odf_func = {};
	var idf_func = {};
	
    var mac_addr = (function () {
        /*
        function s () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }*/
        return 'TVGH' + 'TVGH';
    })();

    if (profile.is_sim == undefined)   profile.is_sim = false;
    if (profile.idf_list == undefined) profile.idf_list = [];
    if (profile.odf_list == undefined) profile.odf_list = [];	
    
    profile['df_list']=[];
    for (var i = 0; i < profile.odf_list.length; i++) {
        odf_name = profile.odf_list[i].name;
        odf_name = odf_name.replace(/_[OI][0-9]*$/g, function (x) {
        x = x.replace(/_/g, "-");
        return x;
        });
        odf_func[odf_name] = profile.odf_list[i];
		profile.odf_list[i] = odf_name;
		profile['df_list'].push(odf_name);
        console.log(odf_name);
    }
	
    for (var i = 0; i < profile.idf_list.length; i++) {
        idf_name = profile.idf_list[i].name;
        idf_name = idf_name.replace(/_[OI][0-9]*$/g, function (x) {
        x = x.replace(/_/g, "-");
        return x;
        });
        idf_func[idf_name] = profile.idf_list[i];
		profile.idf_list[i] = idf_name;
		profile['df_list'].push(idf_name);
        console.log(idf_name);
    }	
	
    function push(idf_name) {
	    data = idf_func[idf_name]();
	    if (data!=undefined) dan.push(idf_name, data);
	}
	
    function pull(odf_name, data) {
        if (odf_name == 'Control') {
            switch (data[0]) {
            case 'SET_DF_STATUS':
                dan.push('Control', ['SET_DF_STATUS_RSP', data[1]], function (res) {});
                break;
            case 'RESUME':
                ida.suspended = false;
                dan.push('Control', ['RESUME_RSP', ['OK']], function (res) {});
                break;
            case 'SUSPEND':
                ida.suspended = true;
                dan.push('Control', ['SUSPEND_RSP', ['OK']], function (res) {});
                break;
            default:
                ida.suspended = false;
                dan.push('Control', ['RESUME_RSP', ['OK']], function (res) {});
                break;
            }
        } else {
            odf_func[odf_name](data);
        }
    }

    function init_callback (result) {
        console.log('register:', result);
        document.title = profile.d_name;
        ida.ida_init();
        
    }

    function deregisterCallback (result) {
        console.log('deregister:', result);
    }

    function deregister () {
        //dan.deregister(deregisterCallback);
    }
    function firstload() {
        console.log('First load ,pull');
        dan.pull_ctl();
    }
    window.onload = firstload;
    window.onunload = deregister;
    window.onbeforeunload = deregister;
    window.onclose = deregister;
    window.onpagehide = deregister;

    dan.init(push, pull, csmapi.get_endpoint(), mac_addr, profile, init_callback);
};
