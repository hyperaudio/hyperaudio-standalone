var out = [];
var transcript = null;

for (i = 0; i < files.length; i++) {
    var url = $(files[i]).attr('href');
    var name = $(files[i]).find('.name').text();

    if (name.endsWith('.mp4')) {
        var name = $(files[i]).find('.name').text();
        var transcript = url + '.transcription.json';

        out.push({
            _id: i,
            label: name,
            url: url,
            transcript: transcript
        });
    }
}
