const loadData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await res.json();
  const aiData = data.data.tools;
  displayData(aiData, true);
  const showMoreBtn = document.getElementById('showMoreBtn');
  showMoreBtn.addEventListener('click', () => {
    displayData(aiData, false);
    showMoreBtn.style.display = 'none';
  });
};

const displayData = (data, status) => {
  const display = document.getElementById('display');
  if (status == true) {
    var target = data.slice(0, 6);
  } else {
    var target = data.slice(7, data.length);
  }
  target.forEach(item => {
    // console.log(item.id);
    const div = document.createElement('div');
    div.innerHTML = `
              <div class="p-6 space-y-5">
            <div><img class="rounded-lg" src="${item.image}" alt="" /></div>
            <div class="mt-6">
              <h3 class="text-xl font-semibold mb-3">Features</h3>
              <ol class="list-decimal ml-5 text-[#585858] text-xs space-y-2">
                <li>${item.features[0]}</li>
                <li>${item.features[1]}</li>
                <li>${item.features[2]}</li>
              </ol>
            </div>
            <div class="flex justify-between">
              <div>
                <h2 class="text-xl font-semibold mb-3">${item.name}</h2>
                <h3 class="list-decimal text-[#585858] text-xs">${item.published_in}</h3>
              </div>
              <div>
                <button  onclick="my_modal_3.showModal() ; modalDisplay(${item.id})"
                  class="bg-[#FEF7F7] border border-red-500 hover:bg-red-500 duration-300 rounded-full py-2 px-3"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
    `;
    display.appendChild(div);
  });
};

const modalDisplay = async id => {
  const idRes = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/0${id}`
  );
  const data = await idRes.json();
  const finalData = data.data;
  modalDatadisplay(finalData);
};

const modalDatadisplay = finalData => {
  const displayModal = document.getElementById('displayModal');
  displayModal.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-2 m-3 gap-3">
                  <div
                    class="bg-[#EB57570D] rounded-lg p-6 border border-red-400 space-y-3 "
                  >
                    <p class="text-base font-semibold">${finalData.description}</p>
                    <div>
                      <div class="flex gap-2 justify-between flex-wrap">
                        <p class="p-2 bg-[#FFFFFF] rounded-xl">
                          ${finalData.pricing[0].price}<br />${finalData.pricing[0].plan}
                        </p>
                        <p class="p-2 bg-[#FFFFFF] rounded-xl">
                          ${finalData.pricing[1].price}<br />${finalData.pricing[0].plan}
                        </p>
                        <p class="p-2 bg-[#FFFFFF] rounded-xl">
                          ${finalData.pricing[0].price}
                        </p>
                      </div>
                      <div>
                        <div class="mt-4">
                          <h2 class="text-base font-semibold">Features</h2>
                          <ul class="text-[#585858] text-[16px]">
                            <li>${finalData.features[1].feature_name}</li>
                            <li>${finalData.features[2].feature_name}</li>
                            <li>${finalData.features[3].feature_name}</li>
                          </ul>
                        </div>
                        <div  class="mt-4">
                          <h2 class="text-base font-semibold">Integrations</h2>
                          <ul class="text-[#585858] text-[16px]">
                            <li>${finalData.integrations[0]}</li>
                            <li>${finalData.integrations[1]}</li>
                            <li>${finalData.integrations[2]}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rounded-lg border border-red-400 p-3">
                    <div>
                      <img class="rounded-lg" src="${finalData.image_link[0]}" alt="" />
                    </div>
                    <div class="mt-3">
                      <h2>${finalData.input_output_examples[0].input}</h2>
                      <p>
                        ${finalData.input_output_examples[0].output}
                      </p>
                    </div>
                  </div>
                </div>
  `;
  displayModal.appendChild(div);
};
loadData();

// document.getElementById('sortBtn').addEventListener('click', () => {
//   const loadSortedData = async () => {
//     const res = await fetch(
//       'https://openapi.programming-hero.com/api/ai/tools'
//     );
//     const data = await res.json();
//     const aiData = data.data.tools;
//     // displayData(aiData, true);
//     // const showMoreBtn = document.getElementById('showMoreBtn');
//     // showMoreBtn.addEventListener('click', () => {
//     //   displayData(aiData, false);
//     //   showMoreBtn.style.display = 'none';
//     // });

//     const newArray = [];
//     const sorted = aiData.map(item => {
//       const dateString = item.published_in;
//       const date = new Date(dateString);
//       const milliseconds = date.getTime();
//       newArray.push(milliseconds);
//     });
//     newArray.sort((a, b) => {
//       return a - b;
//     });
//     newArray.forEach((item, index) => {
//       var date = new Date(item);
//       var year = date.getFullYear();
//       var month = date.getMonth() + 1;
//       var day = date.getDate();
//       var formattedDate = month + '/' + day + '/' + year;
//       let xx = aiData[index].published_in;
//       console.log(xx);
//       if (xx == formattedDate) {
//         const display = document.getElementById('display');
//         display.innerHTML ='';
//         displayData(aiData, true);
//       }
//     });
//   };
//   loadSortedData();
// });
