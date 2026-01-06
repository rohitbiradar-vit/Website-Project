// Schemes loaded from your uploaded PDFs (titles & short descriptions).
    // Full details are in the PDFs referenced in the page response.
    const schemes = [

      { id:'s_mukhyayuva', title:'Mukhyamantri Yuva Swavalamban Yojana', state:'gujarat', cat:'youth', short:'Youth entrepreneurship, training, seed grants & mentorship.' },
      { id:'s_rgkny', title:'Rajiv Gandhi Kisan Nyay Yojana', state:'chhattisgarh', cat:'farmer', short:'Income support per acre + market linkage support.' },
      { id:'s_assam_youth', title:'Swami Vivekananda Assam Youth Empowerment Scheme', state:'assam', cat:'youth', short:'Rural youth skills & employment assistance.' },
      { id:'s_kalia', title:'KALIA (Krushak Assistance for Livelihood & Income Augmentation)', state:'odisha', cat:'farmer', short:'Cultivator support, landless livelihood aid & insurance.' },
      { id:'s_ladli_behna', title:'Ladli Behna Yojana', state:'mp', cat:'women', short:'Monthly cash transfers to women for financial inclusion.' },
      { id:'s_aapda_mitra', title:'Aapda Mitra Volunteer Training Scheme', state:'national', cat:'education', short:'Disaster-response volunteer training & equipment.' },
      { id:'s_young_innovators', title:'Young Innovators Programme', state:'wb', cat:'education', short:'Grants & incubation for student-led startups.' },
      { id:'s_solar_pilot', title:'PM Surya Ghar Muft Bijli Yojana (pilot)', state:'pan-india', cat:'health', short:'Rooftop solar subsidy/pilot for households.' },
      { id:'s_amma_vodi', title:'Jagananna Amma Vodi', state:'andhra', cat:'women', short:'Cash transfer to mothers/guardians for schooling support.' },
      { id:'s_vishwakarma', title:'Rajasthan Vishwakarma Workers Welfare Scheme', state:'rajasthan', cat:'farmer', short:'Support, toolkits, training & social security for artisans.' },
      

      // additional schemes from the other PDF
      { id:'s_amma_unavagam', title:'Amma Unavagam', state:'tn', cat:'health', short:'Subsidised meals / community kitchens.' },
      { id:'s_bhamashah', title:'Bhamashah Yojana', state:'rajasthan', cat:'women', short:'Family ID + DBT-centric service access.' },
      { id:'s_life_mission', title:'LIFE Mission', state:'kerala', cat:'health', short:'Housing for homeless families & basic services.' },
      { id:'s_ysr_rythu', title:'YSR Rythu Bharosa', state:'andhra', cat:'farmer', short:'Farmer cash support & input subsidies.' },
      { id:'s_kanyashree', title:'Kanyashree Prakalpa', state:'wb', cat:'education', short:'Scholarships & grants to keep girls in school.' },
      { id:'s_mukhyam_amrutum', title:'Mukhyamantri Amrutum (MA Yojana)', state:'gujarat', cat:'health', short:'Cashless hospital treatment at empanelled hospitals.' },
      { id:'s_mukhyam_ladli_behna', title:'Mukhyamantri Ladli Behna Yojana', state:'mp', cat:'women', short:'Monthly stipend + womens financial inclusion.' },
      { id:'s_bebe_nanki', title:'Bebe Nanki Laadli Beti Kalyan', state:'punjab', cat:'women', short:'Staged payments to incentivize girl child welfare.' },
      { id:'s_kanya_suraksha', title:'Kanya Suraksha Yojana (MKSY)', state:'bihar', cat:'women', short:'Cash transfers for girl child milestones.' }
    ];

    function capitalize(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : ''; }

    // counts
    function updateCounts(){
      const counts = { youth:0, farmer:0, education:0, women:0, health:0 };
      schemes.forEach(s => { if(counts[s.cat] !== undefined) counts[s.cat]++; });
      document.getElementById('count-youth').textContent = counts.youth + ' schemes';
      document.getElementById('count-farmer').textContent = counts.farmer + ' schemes';
      document.getElementById('count-education').textContent = counts.education + ' schemes';
      document.getElementById('count-women').textContent = counts.women + ' schemes';
      document.getElementById('count-health').textContent = counts.health + ' schemes';
    }

    // render schemes
    function renderSchemes(list){
      const container = document.getElementById('schemesList');
      container.innerHTML = '';
      if(list.length === 0){
        container.innerHTML = '<div class="no-result">No schemes found.</div>';
        document.getElementById('schemesTotal').textContent = '(0)';
        return;
      }
      list.forEach(s => {
        const el = document.createElement('article');
        el.className = 'scheme-card';
        el.innerHTML = `
          <h3>${s.title}</h3>
          <p class="short">${s.short}</p>
          <div class="meta">${capitalize(s.cat)} • ${s.state.toUpperCase()}</div>
          <div class="card-actions">
            <button class="view" data-id="${s.id}">View</button>
            <button class="save" data-id="${s.id}">Save</button>
          </div>
        `;
        container.appendChild(el);
      });

      document.getElementById('schemesTotal').textContent = '(' + list.length + ')';

      document.querySelectorAll('.scheme-card .view').forEach(b=>{
        b.addEventListener('click', e=>{
          const id = e.currentTarget.dataset.id;
      window.location.href = `scheme.html?id=${encodeURIComponent(id)}`;

        });
      });
    }

    // filters
    document.getElementById('btnApply').addEventListener('click', ()=>{
      const cat = document.getElementById('filterCategory').value;
      const state = document.getElementById('filterState').value;
      let filtered = schemes.slice();
      if(cat !== 'all') filtered = filtered.filter(s => s.cat === cat);
      if(state !== 'all') filtered = filtered.filter(s => s.state === state);
      renderSchemes(filtered);
    });

    // search
    document.getElementById('searchInput').addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        const q = e.target.value.trim().toLowerCase();
        renderSchemes(schemes.filter(s => s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)));
      }
    });

    // category click quick filter
    document.querySelectorAll('.cat').forEach(node=>{
      node.addEventListener('click', ()=>{
        const cat = node.dataset.cat;
        const filtered = schemes.filter(s=>s.cat===cat);
        renderSchemes(filtered);
      });
    });

    // init
    updateCounts();
    renderSchemes(schemes);