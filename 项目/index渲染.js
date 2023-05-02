window.onload = function () {
    // 内容栏渲染开始
    // 轮播图渲染开始
    var banner_ul = document.querySelector('#banner');
    // 获取图片地址


    function banner_init() {
        getajax('http://localhost:3000/banner')
            .then((p1) => {
                // console.log(p.banners);
                // 轮播图的图片地址与跳转链接
                let lis = p1.banners;
                let len = lis.length
                let j = 0;
                // console.log(len);
                banner_ul.innerHTML = lis.map((v) => {
                    return `
                    <li class="banner_li"><img src="${v.imageUrl}"  class="banner_img" id="${'img' + j++}"></li>
                    `
                }).join("")
            })
            .then(() => {
                getajax('http://localhost:3000/banner')
                    .then((p2) => {
                        let len = p2.banners.length;
                        let p3 = p2.banners;
                        // console.log(p3[0].imageUrl);
                        // console.log(len);
                        let banner_img = [];

                        // banner_img[0].src = p3[1].imageUrl
                        // console.log(banner_img[0].src);
                        // banner_img[7].setAttribute('class', 'current');

                        let homepage = document.getElementById('homepage');
                        let banner_select = document.getElementById('banner_select');
                        let banner_btn_left = document.getElementById('banner_btn_left');
                        let banner_btn_right = document.getElementById('banner_btn_right');
                        for (let i = 1; i < len; i++) {
                            banner_img[i - 1] = document.querySelector('#img' + i);
                        }



                        // 当前轮播图编号
                        let current_index = -1;
                        // 自动轮播定时器
                        let banner_timer = null;
                        // 轮播图的图片地址与跳转链接
                        let select = (index) => {

                            // 停止播放
                            // stop();
                            // 转数字
                            index = Number(index);
                            // 越界超过最大数量,直接返回
                            if (index >= len - 1) {
                                return;
                            }
                            // 选中当前已选中的,直接返回
                            if (current_index == index) {
                                return;
                            }
                            // 取消当前指示点的选中状态
                            if (current_index > -1) {
                                banner_select.children[current_index].classList.remove('checked');
                            }
                            // 变更当前轮播图的编号
                            current_index = index;
                            // 前景变化
                            banner_img[current_index].src = p3[index].imageUrl;
                            banner_img[current_index].setAttribute('class', 'current');
                            // 增加新的指示点的选中状态
                            banner_select.children[current_index].classList.add('checked');
                        };
                        // 自动切换图片
                        let autoSelect = (index) => {
                            // 转数字
                            index = Number(index);
                            // 越界超过最大数量，直接返回
                            if (index >= len - 1) {
                                return;
                            }
                            // 选中当前已选中的，直接返回
                            if (current_index == index) {
                                return;
                            }
                            // 取消当前指示点的选中状态
                            banner_select.children[current_index].classList.remove('checked');
                            // 变更当前轮播图的编号
                            current_index = index;
                            // 前景图片
                            // 调整过渡时间
                            // banner_img.style.transition = 'opacity 0.5s ease-in 0s';

                            for (let i = 0; i < len - 1; i++) {
                                banner_img[i].setAttribute('class', 'banner_img');
                            }

                            banner_img[current_index].setAttribute('class', 'current');
                            // 延迟变换img图片
                            setTimeout(() => {
                                // 前景变化
                                banner_img[current_index].src = p3[current_index].imageUrl;
                                // 增加新的指示点选中状态
                                // 如果已经通过手动点击了，选中则此处不再执行
                                if (!document.querySelector('.homepage .checked')) {
                                    // banner_select.children[current_index].style.transition = 'background-color 0.5s';
                                    banner_select.children[current_index].classList.add('checked');
                                }
                            }, 500);
                        };
                        // 播放
                        let play = () => {
                            // 3秒切换一次
                            banner_timer = setInterval(() => {
                                // 设置新的index
                                let index = current_index + 1;
                                // 右翻越界，切到第一张
                                if (index >= len - 1) {
                                    index = 0;
                                }
                                // 加载新图片（这里选择自动，增加切换效果）
                                autoSelect(index);
                            }, 2000);
                        };
                        // 停止
                        let stop = () => {
                            clearInterval(banner_timer);
                            banner_timer = null;
                        };

                        // 绑定
                        let bind = () => {
                            // 左翻事件监听
                            banner_btn_left.addEventListener('click', () => {
                                // 设置新的index
                                let index = current_index - 1;
                                // 左翻越界，切到最后一张
                                if (index < 0) {
                                    index = len - 1;
                                }
                                for (let i = 0; i < len - 1; i++) {
                                    banner_img[i].setAttribute('class', 'banner_img');
                                }
                                // 加载新图片
                                select(index);
                            });
                            // 右翻事件监听
                            banner_btn_right.addEventListener('click', () => {
                                // 设置新的index
                                let index = current_index + 1;
                                // 右翻越界，切到第一张
                                if (index >= len - 1) {
                                    index = 0;
                                }
                                for (let i = 0; i < len - 1; i++) {
                                    banner_img[i].setAttribute('class', 'banner_img');
                                    banner_img[i].s
                                }

                                // 加载新图片
                                select(index);
                            })

                            // 循环绑定指示器点击事件
                            for (const key in banner_select.children) {
                                if (banner_select.children.hasOwnProperty(key)) {
                                    const element = banner_select.children[key];
                                    element.addEventListener('click', (e) => {
                                        // 取消默认点击跳转
                                        e.preventDefault();
                                        // 跳转到当前指示点中data-index所指定的图片
                                        select(e.target.dataset.index);
                                    });
                                }
                            }
                            // 绑定鼠标移入事件
                            homepage.addEventListener('mouseover', (e) => {
                                // 防止鼠标从子元素移出时触发
                                if (e.relatedTarget && homepage.compareDocumentPosition(e.relatedTarget) == 10) {
                                    stop();
                                }
                            });
                            // 绑定鼠标移出事件
                            homepage.addEventListener('mouseout', (e) => {
                                // 防止鼠标从子元素移出时触发
                                if (e.relatedTarget && homepage.compareDocumentPosition(e.relatedTarget) == 10) {
                                    play();
                                }
                            });
                            // 绑定鼠标移动事件
                            homepage.addEventListener('mousemove', (e) => {
                                stop();
                            });
                        };

                        // 初始化
                        let init = () => {
                            for (let i = 0; i < len - 1; i++) {
                                // 创建a元素
                                let item = document.createElement('a');
                                // 修改属性
                                item.setAttribute('class', 'item');
                                item.setAttribute('href', '#');
                                item.setAttribute('data-index', i);
                                // 追加元素
                                banner_select.appendChild(item);
                            }

                            // 默认第一张
                            select(0);
                            // 绑定各个事件并开始轮播
                            bind();
                            play();
                        };

                        // 页面加载完毕，执行初始化
                        init();

                    })

            })

    }
    banner_init();





    // 轮播图渲染结束

    // 推荐歌单渲染开始
    // window.onload = function () {
    var songlist = document.querySelector('.songlist');

    getajax('http://localhost:3000/top/playlist?order=hot')
        .then((p) => {
            var arr1 = p.playlists;
            // console.log(arr1);
            songlist.innerHTML = arr1.map(v => {

                return `
                        <li class="item">
                            <div class="image">
                            <img src="${v.coverImgUrl}" alt="">
                            </div>
                            <div class="name">${v.name}</div>
                            <div class="author">
                            <div>by</div> <span>${v.subscribers[0].nickname}</span>
                            </div>
                        </li>
                        `
            }).join('')
        })
    // 推荐歌单渲染结束

}




