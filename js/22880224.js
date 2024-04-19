"use strict";

const API = "https://web1-api.vercel.app/api/";

async function fetchData(apiName, templateId, viewId) {
  const req = await fetch(API + apiName);
  const data = await req.json();
  let context = { data: data };
  let template = Handlebars.compile(
    document.querySelector(templateId).innerHTML
  );
  document.querySelector(viewId).innerHTML = template(context);
}

async function fetchBlog(request, currentPage = 1) {
  const req = await fetch(`${API}${request}?page=${currentPage}`);
  const context = await req.json();
  context.currentPage = currentPage;
  context.request = request;
  let template = Handlebars.compile(
    document.querySelector("#blogs-template").innerHTML
  );
  document.querySelector("#blogs").innerHTML = template(context);
}

async function fetchBlogDetails(blogId, gotoComments = false) {
  await fetchData(`blogs/${blogId}`, "#details-template", "#blogs");
  if (gotoComments) {
    window.location.href = "#comments";
  }
}
