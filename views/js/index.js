$(document).ready(() => {
    console.log('jquery loaded...')

    let data = ''
    for (let i = 0; i < 1000; i++)
        data += 'the quick brown fox jomped over the lazy dog. '

    $('#paste-list').text(data)
})