function getRandomStr(length) {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

    // Pick characers randomly
    let str = "";
    while (length--) {
        str += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return str;
};
self.addEventListener('message', function(e) {
    let message = parseInt(e.data);
    let result1 = getRandomStr(Math.floor(message/2));
    let result2 = getRandomStr(Math.ceil(message/2))
    self.postMessage(result1+result2);
  });
