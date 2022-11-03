const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylist(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}
 
module.exports = PlaylistsService;