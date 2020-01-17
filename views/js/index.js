$(document).ready(() => {

    const baseUrl = "http://localhost:5555"
    const refreshInterval = 5000

    $('#save').click(() => {
        let text = $('#new-paste').val()
        let filename = $('#filename').val()
        let expirationDate = $('#expirationDate').val()

        $.post('/save', {
            data: text,
            filename: filename,
            expirationDate: expirationDate
        }, response => {
            console.log(response)
            if (response.status == 200) {
                refreshList()
                $('#new-paste').val('')
                $('#filename').val('')
                $('#expirationDate').val('')
                alert(`URL for your paste: ${baseUrl}/files/${response.tag}`)
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
        console.log('refresh')

        $.get('/files', files => {

            let op = files.reduce((acc, curr) => acc += `<div class="box"><input type="radio" name="files" value="${curr.tag}"><a href="/files/${curr.tag}" target="_blank">${curr.name}</a><br></div>`, '')

            $('#paste-list').html(op)
        })
    }

    $('#expirationDate').datetimepicker()

    refreshList()

    setInterval(refreshList, refreshInterval)
})