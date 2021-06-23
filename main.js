var imgs = [
    'images/bg-1.jpg',
    'images/bg-2.jpg',
    'images/bg-3.jpg',
    'images/bg-4.jpg',
    'images/bg-5.jpg'
  ],
  n = imgs.length,
  current = n-1,
  closedWidth = Math.floor(window.innerWidth/10)




  // Looping Attribute functionality and Responsive styling    
  for (var i=0; i<n; i++){
  
  var bgImg = document.createElement('div');
  bg.appendChild(bgImg);
  
  gsap.set(bgImg, {
      attr:{id:'bgImg'+i, class:'bgImg'},
      width:'100%',
      height:'100%',
      backgroundImage:'url('+imgs[i]+')',
      backgroundSize:'cover',
      backgroundPosition:'center'
  })





   // Accordion CSS Separation   
  var b = document.createElement('div');
  fg.appendChild(b);

  gsap.fromTo(b, {
      attr:{id:'b'+i, class:'box'},
      innerHTML:'<p><sub>ARTICLE.</sub> '+(i+1)+'</p>',
      width:'100%',
      height:'100%',
      borderLeft:(i>0)?'solid 1px #eee':'',
      backgroundColor:'rgba(250,250,250,0)',
      left:i*closedWidth,
      transformOrigin:'100% 100%',
      x:'100%'
  },{
      duration:i*0.15,
      x:0,
      ease:'expo.inOut'
  })  


  // Mouse Hover Event Target
  b.onmouseenter = b.onclick = (e)=>{    
  if (Number(e.currentTarget.id.substr(1))==current) return;
   
  var staggerOrder = !!(current < Number(e.currentTarget.id.substr(1)));
  current = Number(e.currentTarget.id.substr(1));
  gsap.to('.box', {
    duration:0.5,
    ease:'elastic.out(0.3)',
    left:(i)=>(i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth),
    x:0,
    stagger: staggerOrder? 0.05:-0.05
  })
  
  //Kenburns Transition Animation
  bg.appendChild( document.getElementById('bgImg'+current))
  gsap.fromTo('#bgImg'+current,{opacity:0}, {opacity:1, duration:0.3, ease:'power1.inOut'})
  gsap.fromTo('#bgImg'+current, {scale:1.05, rotation:0.05}, {scale:1, rotation:0, duration:1.5, ease:'sine'})
}
}

//Responsive Support Window Resizing
window.onresize = (e)=> {
    closedWidth = Math.floor(window.innerWidth/10)
    gsap.set('.box', { x:0, left:(i)=> (i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth)})
}