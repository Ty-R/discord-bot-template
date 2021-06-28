const username = async (message) => {
  if (message.member) {
    return message.member.nickname || message.author.username;
  }

  return message.author.username;
};

module.exports = {
  username
};
