$(document).ready(() => {

    $('#save').click(() => {
        let text = $('#new-paste').val()
        let filename = $('#filename').val()
        let expirationDate = $('#expirationDate').val()

        $.post('/save', {
            data: text,
            filename: filename,
            expirationDate: expirationDate
        }, response => {
            if (response == "OK") {
                refreshList()
                $('#new-paste').val('')
                $('#filename').val()
                $('#expirationDate').val('')
            }
            else alert("Something went wrong, please try again.")
        })
    })

    $('#delete').click(() => {

        let filesSelected = $('[name="files"]:checked')
        let tag = filesSelected[0].attributes.value

        $.ajax({
            url: '/files',
            type: 'DELETE',
            data: {
                tag: tag.value
            },
            success: response => {
                if (response == "OK")
                    refreshList()
            },
            error: error => {
                alert("Something went wrong")
            }
        })

    })

    const refreshList = () => {

        $.get('/files', files => {

            let op = files.reduce((acc, curr) => acc += `<div class="box"><input type="radio" name="files" value="${curr.tag}"><a href="/files/${curr.tag}.txt">${curr.name}</a><br></div>`, '')

            $('#paste-list').html(op)
        })
    }

    $('#expirationDate').datetimepicker()

    refreshList()
})