var DntErrors = {

    errorMsg: {},
    errorStack: [],


    // Add an error to the stack
    addError: function(elt_id) {
        var error_exists = false;
        var stack_length = DntErrors.errorStack.length;
        for(i = 0; i < stack_length; i++) {
            if (DntErrors.errorStack[i] == elt_id) {
                error_exists = true;
            }
        }
        if (error_exists == false) {
            DntErrors.errorStack.push(elt_id);
        }
    },

    // Remove an error from the stack
    removeError: function(elt_id) {
        var stack_length = DntErrors.errorStack.length;
        for(i = 0; i < stack_length; i++) {
            if (DntErrors.errorStack[i] == elt_id) {
                DntErrors.errorStack.splice(i, 1);
            }
        }
    },

    // Reset errorStack
    resetErrors: function() {
        DntErrors.errorStack = [];
    },

    // Display errors on the page
    displayErrors: function() {
        $('#form-error').detach();
        var stack_length = DntErrors.errorStack.length;
        if (stack_length == 0) {
            return;
        }

        var e = document.createElement('div');
        e.setAttribute('id', 'form-error');
        e.setAttribute('class', 'line');
        var h3 = document.createElement('h3');
        e.appendChild(h3);
        if (stack_length == 1) {
            var txth3 = document.createTextNode(DntErrors.errorMsg.error);
        } else {
            var txth3 = document.createTextNode(DntErrors.errorMsg.errors.replace('%s', stack_length));
        }
        h3.appendChild(txth3);
        var ul = document.createElement('ul');
        e.appendChild(ul);
        for(i = 0; i < stack_length; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
            // If the error if a qualification type, show a custom error
            // Else, show the dedicated error
            var error_txt = eval('DntErrors.errorMsg.' + DntErrors.errorStack[i]);
            if(error_txt){
                txtli = document.createTextNode(error_txt);
            }else{
                var label = $("label[for='" + DntErrors.errorStack[i] + "']").clone().children().remove().end().text().trim();
                txtli = document.createTextNode(DntErrors.errorMsg.qualification.replace('%s', label));
            }
            li.appendChild(txtli);
        }

        var cont = $('#form-info');
        if (cont.length != 0) {
            cont.after(e);
        } else {
            var cont = $('#content');
            if (cont.length == 0) {
                cont = $('#main');
            }
            cont.prepend(e);
        }

        var url = window.location.href;
        var reg = new RegExp('#form\-error');
        if (!reg.test(url)) {
            location.href = url+ '#form-error';
        } else {
            location.href = url;
        }
    }
}
