(function(){
  document.documentElement.classList.add('js');
  const header=document.querySelector('.site-header');
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>15);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  const toggle=document.querySelector('.mobile-toggle');
  const mobile=document.querySelector('.mobile-nav');
  toggle?.addEventListener('click',()=>{
    const open=mobile.classList.toggle('open');
    document.body.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
  });
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobile.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded','false');
  }));

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Journey animation is intentionally repeatable. Cards animate in when they
  // enter the viewport and reset after they leave, so scrolling back replays it.
  const journeyObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    entry.target.classList.toggle('in-view',entry.isIntersecting);
  }),{threshold:.26,rootMargin:'-6% 0px -14% 0px'});
  document.querySelectorAll('.journey-scroll').forEach((step,index)=>{
    step.style.setProperty('--journey-index',index);
    journeyObserver.observe(step);
  });

  document.querySelectorAll('[data-mailto-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const d=new FormData(form);
      const body=[
        `Name: ${d.get('name')||''}`,
        `Email: ${d.get('email')||''}`,
        `Phone: ${d.get('phone')||''}`,
        `Preferred travel month: ${d.get('month')||''}`,
        `Approximate budget: ${d.get('budget')||''}`,
        '',
        'Honeymoon ideas:',
        d.get('message')||''
      ].join('\n');
      window.location.href=`mailto:nctravel@travel-pa.com?subject=${encodeURIComponent('Honeymoon enquiry from NC Travel website')}&body=${encodeURIComponent(body)}`;
    });
  });

  const monthData={
    January:{image:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=85',badge:'January · Winter sun & magical contrasts',title:'Warm escapes, snowy magic and safari sunrises.',summary:'January is a brilliant month for couples who want sunshine, snow or a bucket-list safari. It is one of the easiest months to mix total relaxation with wow-factor experiences.',region:'Indian Ocean, Caribbean & safari escapes',copy:'Think overwater villas, calm lagoons, white beaches, Northern Lights cabins or wildlife-filled landscapes — all tailored around the two of you.',top:['The Maldives','Mauritius','Thailand'],mood:'Fresh-start energy, winter sunshine and unforgettable contrasts.',bestFor:'Winter sun, contrast trips & wow-factor first escapes',bestForCopy:'Ideal for couples who want a memorable contrast to winter at home — or who want snow, safari or beach in one brilliant month.',atmosphere:'Fresh-start energy, dreamy sunshine and a sense of possibility.'},
    February:{image:'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1500&q=85',badge:'February · Romance season',title:'Peak romance, warm beaches and elegant escapes.',summary:'February naturally feels romantic, making it perfect for honeymoons with sunshine, indulgence and a polished just-married atmosphere.',region:'Indian Ocean, Dubai, Caribbean & Europe city breaks',copy:'From beachfront bliss to stylish city nights, February suits couples who want classic romance with a luxurious feel.',top:['Maldives','Dubai','St Lucia'],mood:'Romantic, polished and perfect for celebrating the moment.',bestFor:'Valentine-season trips, sunshine and glamorous getaways',bestForCopy:'A natural fit for couples who want a honeymoon month that already feels full of celebration.',atmosphere:'Love-filled, luxurious and effortlessly romantic.'},
    March:{image:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=85',badge:'March · Transition into sunshine',title:'A month for balance: warmth, value and variety.',summary:'March sits beautifully between seasons, which makes it a great month for couples seeking good weather, flexibility and a wide choice of destinations.',region:'Mauritius, Bali, Thailand & southern Europe',copy:'You can lean into soft beach weather, cultural trips or an itinerary that blends relaxation with a little exploring.',top:['Mauritius','Bali','Thailand'],mood:'Balanced, easy and quietly luxurious.',bestFor:'Value-conscious luxury and shoulder-season travel',bestForCopy:'Great for couples who want premium experiences without only chasing the busiest dates.',atmosphere:'Sunny, versatile and easy to personalise.'},
    April:{image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=85',badge:'April · Spring sunshine & clarity',title:'Spring brings colour, warmth and beautiful variety.',summary:'April is a lovely honeymoon month for couples who want bright weather, fresh seasonal energy and destination flexibility.',region:'Caribbean, Indian Ocean, Europe & Japan',copy:'Perfect for beach escapes, spring city breaks or scenic routes filled with colour and lighter crowds.',top:['Santorini','Barbados','Japan'],mood:'Fresh, uplifting and full of spring optimism.',bestFor:'Spring romance, scenic trips and island escapes',bestForCopy:'April works especially well for couples wanting both visual beauty and a sense of seasonal freshness.',atmosphere:'Light, blooming and gently adventurous.'},
    May:{image:'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1500&q=85',badge:'May · Early summer magic',title:'Longer days, stylish travel and beautiful weather.',summary:'May is one of the most elegant months for a honeymoon: warm, bright and often less crowded than peak summer.',region:'Europe, Greece, Dubai stopovers & safari pairings',copy:'An ideal month for couples who want pretty coastlines, romantic cities and polished travel without the midsummer rush.',top:['Santorini','Amalfi Coast','South Africa'],mood:'Elegant, sunlit and effortlessly romantic.',bestFor:'Early summer luxury and twin-centre trips',bestForCopy:'Perfect for combining culture, coast and a little indulgence in one well-balanced trip.',atmosphere:'Golden, stylish and full of possibility.'},
    June:{image:'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1500&q=85',badge:'June · Long days & classic favourites',title:'A wonderful month for Europe, islands and curated sunshine.',summary:'June offers long daylight hours, strong weather in many destinations and a lovely sense of summer beginning.',region:'Mediterranean Europe, Indian Ocean & North America',copy:'Whether you want a chic European honeymoon or a sunshine-led beach stay, June makes planning feel open and exciting.',top:['Crete','Lake Como','Mauritius'],mood:'Light-filled, celebratory and warm.',bestFor:'Summer starters, Europe and classic romance',bestForCopy:'A strong option for couples wanting beautiful scenery, long evenings and that just-beginning-of-summer atmosphere.',atmosphere:'Luminous, happy and comfortably premium.'},
    July:{image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85',badge:'July · Peak summer energy',title:'Sun-soaked escapes with plenty of atmosphere.',summary:'July is perfect for couples who want vibrant summer travel, especially in Europe and destinations built around sunshine and sea.',region:'Mediterranean coastlines, Indian Ocean alternatives & adventure trips',copy:'It suits honeymooners who like a little buzz around them — beach clubs, dramatic views, open-air dining and lively evenings.',top:['Santorini','Croatia','Bali'],mood:'Bright, celebratory and high-energy.',bestFor:'Classic summer honeymoons and lively coastlines',bestForCopy:'Best for couples who love warm days, sunset dinners and destinations that feel alive.',atmosphere:'Vibrant, sun-drenched and social.'},
    August:{image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1500&q=85',badge:'August · Big summer moments',title:'Confident sunshine and memorable experiences.',summary:'August opens up plenty of honeymoon possibilities, especially for couples committed to a summer travel window and wanting a special escape built around weather and timing.',region:'Europe, safari combinations and selected long-haul escapes',copy:'The right August honeymoon is all about choosing the right destination mix — somewhere that matches your energy, budget and idea of romance.',top:['Greece','Tanzania','Portugal'],mood:'Confident, sunny and made for big memories.',bestFor:'Summer celebrations and bucket-list combinations',bestForCopy:'Excellent for couples who want their honeymoon to feel celebratory, active and full of highlights.',atmosphere:'Radiant, lively and generous.'},
    September:{image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=85',badge:'September · Honeymoon sweet spot',title:'One of the best months for beautiful weather and calmer luxury.',summary:'September is often a dream honeymoon month thanks to warm seas, softer crowds and a calmer, more refined travel feel.',region:'Europe, Indian Ocean, safari & twin-centre itineraries',copy:'It is ideal for couples wanting that sweet spot between great weather and a more relaxed pace.',top:['Crete','Mauritius','South Africa'],mood:'Sophisticated, relaxed and quietly beautiful.',bestFor:'Shoulder-season elegance and relaxed luxury',bestForCopy:'A brilliant month if you want quality time, lovely weather and fewer peak-season pressures.',atmosphere:'Polished, slower-paced and effortlessly romantic.'},
    October:{image:'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=1500&q=85',badge:'October · Golden escapes',title:'Golden light, tropical warmth and cosy romance.',summary:'October works beautifully for beach destinations, safari pairings and couples who like a slightly moodier, richer seasonal feel.',region:'Indian Ocean, Asia, Middle East & autumn city breaks',copy:'You can chase warmth abroad while keeping a sense of autumn cosiness and depth in the experience.',top:['Maldives','Dubai','Thailand'],mood:'Golden, atmospheric and indulgent.',bestFor:'Autumn sun and richly styled getaways',bestForCopy:'Especially good for couples who want warmth, colour and a honeymoon that feels immersive rather than rushed.',atmosphere:'Warm, golden and quietly dramatic.'},
    November:{image:'https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=1500&q=85',badge:'November · Escape the grey',title:'A perfect month to swap cold days for pure sunshine.',summary:'November is a strong honeymoon month for couples craving warmth, comfort and a beautiful contrast to darker days at home.',region:'Caribbean, Indian Ocean, Dubai & Southeast Asia',copy:'Expect excellent winter-sun appeal, ideal for couples who want to feel instantly transported into holiday mode.',top:['Jamaica','Mauritius','Dubai'],mood:'Restorative, warm and uplifting.',bestFor:'Winter-sun honeymoons and total reset energy',bestForCopy:'A wonderful choice for couples who want to decompress after the wedding and disappear into sunshine.',atmosphere:'Sunny, calm and restorative.'},
    December:{image:'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1500&q=85',badge:'December · Festive wonder',title:'Festive sparkle, tropical beaches or magical winter scenes.',summary:'December offers a unique honeymoon atmosphere: some couples want a festive city break or snowy escape, while others want to trade cold weather for barefoot sunshine.',region:'Caribbean, Indian Ocean, Lapland & stylish cities',copy:'With the right planning, December can feel wonderfully magical — whether your idea of that is a beach at Christmas or candles and snow.',top:['Barbados','Lapland','The Maldives'],mood:'Festive, magical and memory-making.',bestFor:'Christmas romance, sunshine swaps and winter wonder',bestForCopy:'Perfect for couples who want their honeymoon to feel tied to the spirit of the season in their own way.',atmosphere:'Sparkling, cosy and unforgettable.'}
  };

  const destinationData={
    'The Maldives':{image:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=85',region:'Indian Ocean · Signature favourite',title:'The Maldives',description:'Overwater villas, turquoise lagoons, castaway calm and the kind of effortless luxury many couples picture when they imagine a once-in-a-lifetime honeymoon.',mood:'Barefoot luxury',moodCopy:'Perfect for switching off, slowing down and focusing on nothing but each other.',bestFor:'Private villas, snorkelling, spa days and total relaxation.',bestTime:'Brilliant through the drier sunshine seasons and especially popular in winter escape months.',link:'destinations.html#indian-ocean'},
    'Mauritius':{image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',region:'Indian Ocean · Beach & adventure',title:'Mauritius',description:'Mauritius blends beautiful beaches with lush landscapes, catamaran trips, culture and a relaxed sense of island warmth.',mood:'Beach beauty with depth',moodCopy:'A lovely fit for couples who want more than a fly-and-flop honeymoon.',bestFor:'Soft-sand beaches, hikes, island cruising and easy luxury.',bestTime:'Great through many seasons, especially when couples want warmth and a mix of adventure with downtime.',link:'destinations.html#indian-ocean'},
    'Santorini':{image:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85',region:'Europe · Iconic romance',title:'Santorini',description:'Whitewashed beauty, caldera views and famous sunsets make Santorini a classic choice for couples wanting a striking European honeymoon.',mood:'Classic romance',moodCopy:'Made for scenic dinners, boutique stays and unforgettable sunset moments.',bestFor:'Views, cave hotels, island elegance and short-haul wow factor.',bestTime:'Especially lovely in late spring, early summer and early autumn.',link:'destinations.html#europe'},
    'Dubai':{image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',region:'Middle East · Glamour & sunshine',title:'Dubai',description:'Dubai is ideal for couples who want luxury hotels, rooftop dining, desert experiences and sunshine wrapped in a polished city break.',mood:'Glamorous sunshine',moodCopy:'A great pick for couples who enjoy style, comfort and statement experiences.',bestFor:'Short luxury honeymoons, stopovers and twin-centre combinations.',bestTime:'Best in the cooler sunshine months when the city feels vibrant and comfortable.',link:'destinations.html#asia'},
    'Thailand':{image:'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1600&q=85',region:'Asia · Warm, varied & welcoming',title:'Thailand',description:'Thailand offers tropical beaches, island hopping, boutique resorts, culture and fantastic food — all with a welcoming atmosphere.',mood:'Relaxed adventure',moodCopy:'It balances romance, value and memorable experiences beautifully.',bestFor:'Island hopping, beach stays, food lovers and a classic tropical honeymoon.',bestTime:'Depends on the coast you choose, which makes tailored planning especially valuable.',link:'destinations.html#asia'},
    'Jamaica':{image:'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1600&q=85',region:'Caribbean · Rhythm & personality',title:'Jamaica',description:'Jamaica brings a laid-back island spirit, dramatic scenery, waterfalls and luxury stays with a strong sense of character.',mood:'Warm-hearted escape',moodCopy:'Perfect for couples who want sunshine, music, flavour and a more expressive destination.',bestFor:'Resort stays, waterfalls, Caribbean colour and sunset views.',bestTime:'A strong winter-sun choice with a relaxed tropical feel.',link:'destinations.html#caribbean'},
    'Crete':{image:'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=85',region:'Europe · Sun, sea & easy charm',title:'Crete',description:'Crete gives couples a lovely Mediterranean blend of beaches, character towns, food, history and easy-going romance.',mood:'Easy Mediterranean romance',moodCopy:'A comfortable, appealing option for couples wanting warmth without long-haul travel.',bestFor:'Beach days, scenic drives, local tavernas and relaxed luxury.',bestTime:'Best across the sunnier Mediterranean months, especially late spring to early autumn.',link:'destinations.html#europe'},
    'South Africa':{image:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=85',region:'Adventure · Safari & scenery',title:'South Africa',description:'South Africa offers one of the most exciting honeymoon combinations: safari, wine country, dramatic coastlines and stylish lodges.',mood:'Something unforgettable',moodCopy:'Ideal for couples who want their honeymoon to feel adventurous, elevated and full of stories.',bestFor:'Big Five safaris, Cape Town, vineyards and twin-centre itineraries.',bestTime:'Excellent when timed around the region and whether you want safari, city or a beach add-on.',link:'destinations.html#adventure'},
    'Bali':{image:'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1600&q=85',region:'Asia · Tropical soul',title:'Bali',description:'Bali combines private villas, spiritual calm, lush landscapes and beach-club glamour in a way that feels both romantic and personal.',mood:'Tropical soul',moodCopy:'Brilliant for couples who like both indulgence and a sense of culture.',bestFor:'Private pool villas, rice terraces, spa time and soft adventure.',bestTime:'Especially appealing in the drier, sunnier travel windows.',link:'destinations.html#asia'}
  };

  function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value;}
  function setHTML(id,value){const el=document.getElementById(id);if(el)el.innerHTML=value;}
  function setImg(id,src,alt){const el=document.getElementById(id);if(el){el.src=src;el.alt=alt;}}

  const homeMonthBtns=[...document.querySelectorAll('[data-home-month]')];
  const updateHomeMonth=(month)=>{
    const d=monthData[month]; if(!d) return;
    homeMonthBtns.forEach(btn=>btn.classList.toggle('active',btn.dataset.homeMonth===month));
    setImg('homeMonthImage',d.image,`${month} honeymoon inspiration`);
    setText('homeMonthBadge',d.badge);
    setText('homeMonthTitle',d.title);
    setText('homeMonthSummary',d.summary);
    setText('homeMonthRegion',d.region);
    setText('homeMonthCopy',d.copy);
    setHTML('homeMonthTopPicks',d.top.map(item=>`<span>${item}</span>`).join(''));
    setText('homeMonthMood',d.mood);
    const link=document.getElementById('homeMonthLink');
    if(link){link.href=`when-to-go.html#${month.toLowerCase()}`;link.textContent=`Explore ${month} in detail`;}
  };
  homeMonthBtns.forEach(btn=>btn.addEventListener('click',()=>updateHomeMonth(btn.dataset.homeMonth)));
  if(homeMonthBtns.length) updateHomeMonth(homeMonthBtns.find(b=>b.classList.contains('active'))?.dataset.homeMonth || 'January');

  const destinationBtns=[...document.querySelectorAll('[data-destination]')];
  const updateDestination=(name)=>{
    const d=destinationData[name]; if(!d) return;
    destinationBtns.forEach(btn=>btn.classList.toggle('active',btn.dataset.destination===name));
    setImg('destinationHeroImage',d.image,`${name} honeymoon inspiration`);
    setText('destinationRegion',d.region);
    setText('destinationTitle',d.title);
    setText('destinationDescription',d.description);
    setText('destinationMood',d.mood);
    setText('destinationMoodCopy',d.moodCopy);
    setText('destinationBestFor',d.bestFor);
    setText('destinationBestTime',d.bestTime);
    const link=document.getElementById('destinationLink');
    if(link){link.href=d.link;link.textContent=`Explore ${name} honeymoon ideas`;}
  };
  destinationBtns.forEach(btn=>btn.addEventListener('click',()=>updateDestination(btn.dataset.destination)));
  if(destinationBtns.length) updateDestination(destinationBtns.find(b=>b.classList.contains('active'))?.dataset.destination || 'The Maldives');

  const pageMonthBtns=[...document.querySelectorAll('[data-month-target]')];
  const monthArticles=[...document.querySelectorAll('.month-article')];
  const monthSearch=document.getElementById('monthSearch');
  const monthSearchResult=document.getElementById('monthSearchResult');
  const clearMonthSearch=document.getElementById('clearMonthSearch');
  const prevMonthBtn=document.getElementById('prevMonth');
  const nextMonthBtn=document.getElementById('nextMonth');
  const monthOrder=Object.keys(monthData);
  const monthContent=document.querySelector('.month-content');
  const scrollToMonthStart=()=>{
    if(!monthContent) return;
    requestAnimationFrame(()=>monthContent.scrollIntoView({behavior:'smooth',block:'start'}));
  };
  const activateMonth=(month,{updateHash=true,scrollToStart=false}={})=>{
    if(!monthData[month]) return;
    pageMonthBtns.forEach(btn=>btn.classList.toggle('active',btn.dataset.monthTarget===month));
    monthArticles.forEach(article=>article.classList.toggle('active',article.dataset.month===month));
    const d=monthData[month];
    setImg('monthShowcaseImage',d.image,`${month} honeymoon inspiration`);
    setText('monthShowcaseBadge',d.badge);
    setText('monthShowcaseTitle',`${month} honeymoon inspiration at a glance`);
    setText('monthShowcaseSummary',d.summary);
    setText('monthShowcaseBestFor',d.bestFor);
    setText('monthShowcaseBestForCopy',d.bestForCopy);
    setHTML('monthShowcaseDestinations',d.top.map(item=>`<span>${item}</span>`).join(''));
    setText('monthShowcaseAtmosphere',d.atmosphere);
    const showcaseLink=document.getElementById('monthShowcaseLink');
    if(showcaseLink){showcaseLink.href=`#${month.toLowerCase()}`;showcaseLink.textContent=`Read ${month} in full`;}
    if(updateHash){history.replaceState(null,'',`#${month.toLowerCase()}`);}
    if(scrollToStart) scrollToMonthStart();
  };
  document.querySelectorAll('.month-nav [data-month-target]').forEach(btn=>
    btn.addEventListener('click',()=>activateMonth(btn.dataset.monthTarget,{updateHash:true,scrollToStart:true}))
  );
  document.querySelectorAll('.month-progress [data-month-target]').forEach(btn=>
    btn.addEventListener('click',()=>activateMonth(btn.dataset.monthTarget,{updateHash:true,scrollToStart:true}))
  );
  const shiftMonth=(step)=>{
    const activeName=monthArticles.find(article=>article.classList.contains('active'))?.dataset.month || 'January';
    const currentIndex=monthOrder.indexOf(activeName);
    const nextIndex=(currentIndex+step+monthOrder.length)%monthOrder.length;
    activateMonth(monthOrder[nextIndex],{updateHash:true,scrollToStart:true});
  };
  prevMonthBtn?.addEventListener('click',()=>shiftMonth(-1));
  nextMonthBtn?.addEventListener('click',()=>shiftMonth(1));

  if(monthSearch){
    const searchable=Object.entries(monthData).map(([name,d])=>({name,text:[name,d.title,d.summary,d.region,d.copy,...d.top,[d.mood,d.bestFor,d.atmosphere]].join(' ').toLowerCase()}));
    const runSearch=()=>{
      const q=monthSearch.value.trim().toLowerCase();
      if(!q){
        monthSearchResult.textContent='Choose a month below, or search the full guide.';
        return;
      }
      const results=searchable.filter(item=>item.text.includes(q));
      if(results.length){
        const first=results[0].name;
        activateMonth(first,{updateHash:true});
        monthSearchResult.innerHTML=`Showing <strong>${results.length}</strong> relevant month${results.length>1?'s':''}. First match: <strong>${first}</strong>.`;
      }else{
        monthSearchResult.textContent='No direct month match found. Try a destination, region, activity or weather style.';
      }
    };
    monthSearch.addEventListener('input',runSearch);
    clearMonthSearch?.addEventListener('click',()=>{monthSearch.value='';monthSearchResult.textContent='Choose a month below, or search the full guide.';});
  }

  const hash=window.location.hash?.replace('#','');
  if(hash){
    const match=Object.keys(monthData).find(month=>month.toLowerCase()===hash.toLowerCase());
    if(match) activateMonth(match,{updateHash:false});
  }else if(pageMonthBtns.length){
    activateMonth(pageMonthBtns.find(b=>b.classList.contains('active'))?.dataset.monthTarget || 'January',{updateHash:false});
  }
})();

/* Premium step-by-step honeymoon planner */
window.addEventListener('DOMContentLoaded',()=>{
  const modal=document.getElementById('honeymoonPlanner');
  if(!modal) return;

  const form=modal.querySelector('[data-honeymoon-planner]');
  const steps=[...modal.querySelectorAll('[data-planner-step]')];
  const openers=[...document.querySelectorAll('[data-open-planner]')];
  const closers=[...modal.querySelectorAll('[data-close-planner]')];
  const backBtn=modal.querySelector('[data-planner-back]');
  const nextBtn=modal.querySelector('[data-planner-next]');
  const submitBtn=modal.querySelector('[data-planner-submit]');
  const errorEl=modal.querySelector('[data-planner-error]');
  const stepLabel=document.getElementById('plannerStepLabel');
  const stepName=document.getElementById('plannerStepName');
  const progressBar=document.getElementById('plannerProgressBar');
  const stepDots=[...modal.querySelectorAll('[data-step-dot]')];
  const videoToggle=modal.querySelector('[data-video-toggle]');
  const consultationWrap=modal.querySelector('[data-consultation-date]');
  const appointmentInput=consultationWrap?.querySelector('input');
  const stepNames=['About you','Contact','Your honeymoon','Budget & ideas','Consultation'];
  let current=1;
  let lastTrigger=null;

  const openPlanner=(trigger)=>{
    lastTrigger=trigger || document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('planner-open');
    history.replaceState(null,'','#plan-honeymoon');
    setTimeout(()=>modal.querySelector('.planner-close')?.focus(),80);
  };

  const closePlanner=()=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('planner-open');
    if(location.hash==='#plan-honeymoon') history.replaceState(null,'',location.pathname+location.search);
    lastTrigger?.focus?.();
  };

  openers.forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openPlanner(el);}));
  closers.forEach(el=>el.addEventListener('click',closePlanner));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open')) closePlanner();});
  if(location.hash==='#plan-honeymoon') openPlanner();

  const updateStep=()=>{
    steps.forEach(step=>step.classList.toggle('active',Number(step.dataset.plannerStep)===current));
    stepDots.forEach(dot=>dot.classList.toggle('active',Number(dot.dataset.stepDot)===current));
    stepLabel.textContent=`Step ${current} of ${steps.length}`;
    stepName.textContent=stepNames[current-1];
    progressBar.style.width=`${(current/steps.length)*100}%`;
    backBtn.disabled=current===1;
    nextBtn.hidden=current===steps.length;
    submitBtn.hidden=current!==steps.length;
    errorEl.textContent='';
    modal.querySelector('.planner-form')?.scrollTo({top:0,behavior:'smooth'});
    setTimeout(()=>{
      const first=steps[current-1]?.querySelector('input:not([type="hidden"]),select,textarea,button.planner-choice');
      first?.focus({preventScroll:true});
    },180);
  };

  const validateStep=()=>{
    const step=steps[current-1];
    if(!step) return true;
    let valid=true;
    let firstInvalid=null;
    step.querySelectorAll('[required]').forEach(field=>{
      const okay=field.type==='checkbox' ? field.checked : field.checkValidity() && String(field.value).trim()!=='';
      const holder=field.closest('.planner-field');
      holder?.classList.toggle('invalid',!okay);
      if(!okay){valid=false;firstInvalid ||= field;}
    });
    if(!valid){
      errorEl.textContent='Please complete the highlighted detail before continuing.';
      firstInvalid?.focus();
    }else errorEl.textContent='';
    return valid;
  };

  nextBtn?.addEventListener('click',()=>{
    if(!validateStep()) return;
    if(current<steps.length){current++;updateStep();}
  });
  backBtn?.addEventListener('click',()=>{if(current>1){current--;updateStep();}});

  modal.querySelectorAll('.planner-field input,.planner-field select,.planner-field textarea').forEach(field=>{
    field.addEventListener('input',()=>field.closest('.planner-field')?.classList.remove('invalid'));
    field.addEventListener('change',()=>field.closest('.planner-field')?.classList.remove('invalid'));
  });

  const choiceValue=modal.querySelector('[data-choice-value]');
  const choiceButtons=[...modal.querySelectorAll('.planner-choice')];
  choiceButtons.forEach(btn=>btn.addEventListener('click',()=>{
    btn.classList.toggle('selected');
    btn.setAttribute('aria-pressed',String(btn.classList.contains('selected')));
    if(choiceValue) choiceValue.value=choiceButtons.filter(b=>b.classList.contains('selected')).map(b=>b.dataset.choice).join(', ');
  }));

  videoToggle?.addEventListener('change',()=>{
    const enabled=videoToggle.checked;
    consultationWrap.hidden=!enabled;
    if(appointmentInput) appointmentInput.required=enabled;
  });

  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateStep()) return;
    const d=new FormData(form);
    const fullName=[d.get('title'),d.get('firstName'),d.get('lastName')].filter(Boolean).join(' ');
    const dial=d.get('dialCode')==='other' ? '' : d.get('dialCode');
    const lines=[
      'NC Travel Honeymoon Planner Enquiry',
      '-----------------------------------',
      `Name: ${fullName}`,
      `Phone: ${dial||''} ${d.get('phone')||''}`.trim(),
      `Email: ${d.get('email')||''}`,
      '',
      'Honeymoon preferences',
      `Style: ${d.get('honeymoonStyle')||'Not specified'}`,
      `Preferred month: ${d.get('travelMonth')||'Not sure yet'}`,
      `Duration: ${d.get('duration')||'Flexible'}`,
      `Budget: ${d.get('budget')||'Not specified'}`,
      `Destination ideas: ${d.get('destination')||'Open to ideas'}`,
      `Departure airport: ${d.get('airport')||'Not specified'}`,
      '',
      `Video consultation: ${d.get('videoConsultation')||'No'}`,
      `Preferred appointment date: ${d.get('appointmentDate')||'Not requested'}`,
      '',
      'Additional notes:',
      d.get('notes')||'None'
    ];
    submitBtn.disabled=true;
    submitBtn.innerHTML='Opening enquiry <span>→</span>';
    window.location.href=`mailto:nctravel@travel-pa.com?subject=${encodeURIComponent(`Honeymoon planning enquiry — ${fullName||'NC Travel website'}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setTimeout(()=>{
      submitBtn.disabled=false;
      submitBtn.innerHTML='Send to Nikki <span>→</span>';
    },1200);
  });

  updateStep();
});


/* Homepage hero video sound control */
window.addEventListener('DOMContentLoaded',()=>{
  const video=document.getElementById('honeymoonHeroVideo');
  const soundButton=document.querySelector('[data-hero-sound]');
  if(!video || !soundButton) return;

  const label=soundButton.querySelector('[data-hero-sound-label]');

  const syncSoundUI=()=>{
    const unmuted=!video.muted;
    soundButton.classList.toggle('is-unmuted',unmuted);
    soundButton.setAttribute('aria-pressed',String(unmuted));
    soundButton.setAttribute('aria-label',unmuted ? 'Mute honeymoon video' : 'Unmute honeymoon video');
    if(label) label.textContent=unmuted ? 'Mute' : 'Sound on';
  };

  video.muted=true;
  video.defaultMuted=true;
  video.play().catch(()=>{});
  syncSoundUI();

  soundButton.addEventListener('click',()=>{
    video.muted=!video.muted;
    if(video.paused) video.play().catch(()=>{});
    syncSoundUI();
  });

  video.addEventListener('volumechange',syncSoundUI);
});
