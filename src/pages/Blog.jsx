
// src/BlogList.js

// import React from 'react';


const BlogList = () => {
  const posts = [
    {
      date: "26 Th6",
      title: "Lộ diện địa điểm hot ở Măng Đen – du khách check in rần rần",
      content: "De Vivre Măng Đen tọa lạc giữa 'trái tim' thị trấn Măng Đen, là địa ...",
      image: "https://kontumtrip.com/wp-content/uploads/2021/03/du-lich-mang-den-da-lat-nguyen-so-tren-dinh-nui-kontum-1615308655-900x500.jpg"
    },
    {
      date: "26 Th6",
      title: "Vẻ đẹp hoang sơ, lạ mắt của rừng ngập mặn Bàu Cá Cái",
      content: "Bàu Cá Cái (Quảng Ngãi) là rừng ngập mặn được bao bọc xung quanh bởi ...",
      image: "https://i.pinimg.com/1200x/5d/ce/da/5dceda335294cf058b91bbe6b9c7b801.jpg"
    },
    {
      date: "26 Th6",
      title: "Chiêm ngưỡng tượng Phật cao 81m tạc trong vách núi An Giang",
      content: "Thất Sơn huyền bí luôn mang đến cho du khách những điều mới mẻ để ...",
      image: "https://images.baoangiang.com.vn/image/media/2024/20240325/video/thumbnail/690x420/4591_base64-17085713050892030784264copy.jpg"
    },
    {
      date: "26 Th6",
      title: "Cẩm nang du lịch Vịnh Hạ Long",
      content: "Vịnh Hạ Long rộng hơn 1.500 km2, với hơn 2.000 hòn đảo lớn nhỏ với ...",
      image: "https://cafefcdn.com/zoom/600_315/203337114487263232/2024/2/1/en-duong-dao-dep-nhat-vinh-ha-long-a22f1f7546b5c52ac99cefe9182e48dc-1706688825521-1706688825746385604936-1706777253147-170677-0-9-375-609-crop-17067773374861688330010.jpg"
    },
    {
      date: "26 Th6",
      title: "Bánh flan Việt vào top món tráng miệng ngon nhất châu Á",
      content: "Món bánh quen thuộc làm từ trứng, sữa, đường caramel du nhập từ châu Âu, ...",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROIfNO4ZQhI3OArdMHFyhfCik2DTlegtYZA&s"
    },
    {
      date: "26 Th6",
      title: "Hai khách sạn Việt được công nhận 'tốt nhất thế giới'",
      content: "Sofitel Legend Metropole và Four Seasons Resort The Nam Hai được chọn vào ...",
      image: "https://vcdn1-dulich.vnecdn.net/2024/02/19/1-1708342038-6598-1708342134.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=sQG9gsWbg0l78qfMbMwBHw"
    },
    {
      date: "26 Th6",
      title: "Người Việt ngày càng thích du lịch tâm linh",
      content: "Đà Lạt hiện đang phát triển du lịch tâm linh, thu hút ngày càng nhiều ...",
      image: "https://image.plo.vn/w1000/Uploaded/2024/rptkbun/2023_04_24/p8-bai-votung-dalas-1h-viethoa-9037.jpg.webp"
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          {posts.map((post, index) => (
            <div key={index} className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={post.image} className="card-img" alt={post.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title"><a href="http://">{post.title}</a></h5>
                    <p className="card-text"><small className="text-muted">{post.date}</small></p>
                    <p className="card-text">{post.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="search-bar mb-3">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <div className="list-group">
            <button type="button" className="list-group-item list-group-item-action active">
              Bài viết mới
            </button>
            {posts.map((post, index) => (
              <button key={index} type="button" className="list-group-item list-group-item-action">
                <img style={{ width: '100%' }} src={post.image} className="sidebar-img" alt={post.title} />
                {post.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
