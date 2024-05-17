function createMusicPlayer() {
    let playlists = [];
    let currentPlaylistIndex = 0;
    let currentSongIndex = 0;

    return {
        playlists: playlists,
        currentElement: function() {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs && this.currentSongIndex >= 0 && this.currentSongIndex < currentPlaylist.songs.length) {
            // Return the song object at the current song index
               return currentPlaylist.songs[this.currentSongIndex];
           } else {
                 console.log("Error: Current playlist or current song index is invalid.");
                 return null;
           }
        },
        currentIndex: function() {
            return this.currentSongIndex;
        },
        length: function() {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
                return currentPlaylist.songs.length;
            } else {
                 return 0;
              }
        },
        find: function(songName) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
               // Iterate over the songs array to find the song by its name
               for (let i = 0; i < currentPlaylist.songs.length; i++) {
                  if (currentPlaylist.songs[i].name === songName) {
                     return currentPlaylist.songs[i];
               }
            }
            console.log(`Error: Song '${songName}' not found in the current playlist.`);
            return null;
            } else {
                console.log("Error: Current playlist not found or invalid.");
                 return null;
            }
        },
        findIndex: function(songName) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
               // Iterate over the songs array to find the index of the song by its name
               for (let i = 0; i < currentPlaylist.songs.length; i++) {
                  if (currentPlaylist.songs[i].name === songName) {
                    return i;
                }
            }
            // If song not found, return -1
            return -1;
            } else {
                // Handle invalid playlist
                 console.log("Error: Current playlist not found or invalid.");
                return -1;
            }
        },
        filter: function(artistName) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
               const filteredSongs = [];
               // Iterate over the songs array to filter songs by artist name
               for (let i = 0; i < currentPlaylist.songs.length; i++) {
                  if (currentPlaylist.songs[i].artist === artistName) {
                    filteredSongs.push(currentPlaylist.songs[i]);
                }
            }
            return filteredSongs;
            } else {
                 console.log("Error: Current playlist not found or invalid.");
                  return [];
           }
        },
        reverse: function() {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
               const reversedSongs = [];
               // Iterate over the songs array in reverse order
               for (let i = currentPlaylist.songs.length - 1; i >= 0; i--) {
                  reversedSongs.push(currentPlaylist.songs[i]);
               }
               currentPlaylist.songs = reversedSongs; // Update the playlist with reversed songs
               console.log("Songs reversed successfully.");
            } else {
                 console.log("Error: Current playlist not found or invalid.");
           }
        },
        insert: function(song) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
                // Check if the song already exists in the playlist
                const exists = currentPlaylist.songs.some(existingSong => {
                    return existingSong.name === song.name && existingSong.artist === song.artist;
                });
                if (exists) {
                    console.log(`Song '${song.name}' by '${song.artist}' already exists in the playlist.`);
                } else {
                    // Manually insert the song into the playlist
                    currentPlaylist.songs.push(song);
                    console.log(`Song '${song.name}' by '${song.artist}' has been added to the playlist.`);
                }
            } else {
                console.log("Error: Current playlist not found or invalid.");
            }
        },
        insertAt: function(index, song) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs) {
                // Validate index
                if (index >= 0 && index <= currentPlaylist.songs.length) {
                    // Shift elements to make space for the new song
                    for (let i = currentPlaylist.songs.length; i > index; i--) {
                        currentPlaylist.songs[i] = currentPlaylist.songs[i - 1];
                    }
                    // Insert the song at the specified index
                    currentPlaylist.songs[index] = song;
                    console.log(`Song '${song.name}' by '${song.artist}' has been inserted at index ${index} in the playlist.`);
                } else {
                    console.log("Error: Index out of range.");
                }
            } else {
                console.log("Error: Current playlist not found or invalid.");
            }
        },
        deleteAt: function(index) {
            const currentPlaylist = this.playlists[this.currentPlaylistIndex];
            if (currentPlaylist && currentPlaylist.songs && index >= 0 && index < currentPlaylist.songs.length) {
                // Create a new array without the song at the specified index
                const updatedSongs = currentPlaylist.songs.filter((song, i) => i !== index);
                // Update the playlist with the new array of songs
                currentPlaylist.songs = updatedSongs;
                console.log(`Song at index ${index} removed successfully.`);
            } else {
                console.log("Error: Current playlist not found, invalid index, or song does not exist at the specified index.");
            }
        },
        next: function() {
            if (this.currentSongIndex < this.playlists[this.currentPlaylistIndex].songs.length - 1) {
                this.currentSongIndex++;
            } else {
                this.currentSongIndex = 0;
            }
        },
        previous: function() {
            if (this.currentSongIndex > 0) {
                this.currentSongIndex--;
            } else {
                this.currentSongIndex = this.playlists[this.currentPlaylistIndex].songs.length - 1;
            }
        },
        last: function() {
            this.currentSongIndex = this.playlists[this.currentPlaylistIndex].songs.length - 1;
        },
        first: function() {
            this.currentSongIndex = 0;
        }
    };
}

function performPlayerOperation(operation, player, params) {
    switch (operation) {
        case 'currentElement':
            console.log("---Finding Current Element--")
            console.log(player.currentElement());
            break;
        case 'currentIndex':
            console.log("---Finding Current Index--")
            console.log(player.currentIndex());
            break;
        case 'length':
            console.log("---Finding Length--")
            console.log(player.length());
            break;
        case 'find':
            console.log("---Finding Song--")
            console.log(player.find(params));
            break;
        case 'findIndex':
            console.log("---Finding Song with Index--")
            console.log(player.findIndex(params));
            break;
        case 'filter':
            console.log("---Filtering Opearation--")
            console.log(player.filter(params));
            break;
        case 'reverse':
            console.log("---Reversing Player Songs--")
            player.reverse();
            break;
        case 'insert':
            console.log("---Performing Insert Opeartion--")
            player.insert(params);
            break;
        case 'insertAt':
            console.log("---Performing Insert At position--")
            player.insertAt(params.index, params.song);
            break;
        case 'deleteAt':
            console.log("---Performing delete  At position--")
            player.deleteAt(params);
            break;
        case 'next':
            console.log("---Moving to next song--")
            player.next();
            break;
        case 'previous':
            console.log("---Moving to previous song--")
            player.previous();
            break;
        case 'last':
            console.log("---Moving to last song--")
            player.last();
            break;
        case 'first':
            console.log("---Moving to first song--")
            player.first();
            break;
        default:
            console.log("Invalid operation.");
    }
}

// Example usage:
let player = createMusicPlayer();

// Create playlists
player.playlists.push({ name: "SaptaSwaralu", songs: [{ name: "Song 1", artist: "Artist 1" }, { name: "Song 2", artist: "Artist 2" }] });
player.playlists.push({ name: "Sarigamalu", songs: [{ name: "Song 3", artist: "Artist 3" }, { name: "Song 4", artist: "Artist 4" }] });

// Change current playlist
player.currentPlaylistIndex = 1;

// Perform player operations
performPlayerOperation('insert', player, { name: "Song 5", artist: "Artist 5" });
performPlayerOperation('length', player);
performPlayerOperation('next', player);
performPlayerOperation('previous', player);
performPlayerOperation('last', player);
performPlayerOperation('first', player);
performPlayerOperation('insertAt', player, { index: 1, song: { name: "Song 6", artist: "Artist 6" } });
performPlayerOperation('find', player, 'Song 3');
performPlayerOperation('findIndex', player, 'Song 6');
performPlayerOperation('filter', player, 'Artist 4');
performPlayerOperation('reverse', player);
performPlayerOperation('deleteAt', player, 1);
performPlayerOperation('next', player);
performPlayerOperation('previous', player);
performPlayerOperation('last', player);
performPlayerOperation('first', player);
performPlayerOperation('currentElement', player);
performPlayerOperation('currentIndex', player);
performPlayerOperation('next', player);
performPlayerOperation('currentIndex', player);

/*
[Running] node "c:\JSPractice\asyncawait\assessment\player.js"
---Performing Insert Opeartion--
Song 'Song 5' by 'Artist 5' has been added to the playlist.
---Finding Length--
3
---Moving to next song--
---Moving to previous song--
---Moving to last song--
---Moving to first song--
---Performing Insert At position--
Song 'Song 6' by 'Artist 6' has been inserted at index 1 in the playlist.
---Finding Song--
{ name: 'Song 3', artist: 'Artist 3' }
---Finding Song with Index--
1
---Filtering Opearation--
[ { name: 'Song 4', artist: 'Artist 4' } ]
---Reversing Player Songs--
Songs reversed successfully.
---Performing delete  At position--
Song at index 1 removed successfully.
---Moving to next song--
---Moving to previous song--
---Moving to last song--
---Moving to first song--
---Finding Current Element--
{ name: 'Song 5', artist: 'Artist 5' }
---Finding Current Index--
0
---Moving to next song--
---Finding Current Index--
1

[Done] exited with code=0 in 0.14 seconds

*/