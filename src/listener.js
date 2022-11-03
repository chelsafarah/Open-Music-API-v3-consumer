class Listener {
    constructor(playlistsService, songsService, mailSender) {
      this._playlistsService = playlistsService;
      this._songsService =songsService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { id, targetEmail } = JSON.parse(message.content.toString());
  
        const getPlaylist = await this._playlistsService.getPlaylist(id);
        getPlaylist.songs = await this._songsService.getSongByPlaylistId(id);
        console.log(getPlaylist);
        const data = {
          playlist: getPlaylist,
        }

        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;