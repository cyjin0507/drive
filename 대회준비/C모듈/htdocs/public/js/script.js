function ajax(url, type, data, successFn, errorFn) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        contentType: false,
        processData: false,
        success: successFn,
        error: errorFn
    });
}