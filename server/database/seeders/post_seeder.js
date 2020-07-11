const Post = require('../../models/post');
const User = require('../../models/user');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const Fs = require('fs');
const Path = require('path')

const userData = {
  filter: { name: 'admin' },
  data: {
    name: 'admin',
    email: 'tamnk74@gmail.com',
    password: 'Admin123!@#'
  }
}
const posts = [{
  filter: { title: 'test' },
  data: {
    title: 'test',
    slug: 'test',
    category: {
      _id: mongoose.Types.ObjectId(),
      name: 'english'
    },
    content: 'Admin123!@#'
  }
}]



const url = "https://listenaminute.com";

const getFileNameFromLink = async (link) => {
  try {
    const res = await axios.get(`${url}/${link}`);
    const html = res.data;
    const $ = cheerio.load(html);
    return $('article > table').text().trim();
  } catch (err) {
    console.log('Failed: ', `${url}/${link}`);
  }
}



module.exports = async function () {
  const [, user] = await User.findOrCreate(userData.filter, userData.data);
  console.log(user);
  await axios.get(url).then(async (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const links = $('table > tbody > tr a');
    const linkTails = [];
    links.each(function () {
      const text = $(this).text();
      linkTails.push($(this).attr('href'));
    });
    const category = {
      _id: mongoose.Types.ObjectId(),
      name: 'english'
    };

    await linkTails.reduce((rs, link) => rs.then(async () => {
      const content = await getFileNameFromLink(link);
      await Post.create({
        user: user._id,
        title: link,
        slug: link,
        category,
        content
      })
    }), Promise.resolve())
  }).catch(err => console.log(err))
}



