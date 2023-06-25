products = [
    {
        'image': 'images/product/抹茶百香露露.jpeg',
        'title': 'Product Title 1',
        'name': 'Product Name 1',
        'description': 'Product Description 1',
        'price': 'Product Price 1'
    },
    {
        'image': 'images/product/抹茶百香露露.jpeg',
        'title': 'Product Title 2',
        'name': 'Product Name 2',
        'description': 'Product Description 2',
        'price': 'Product Price 2'
    },
    # 添加更多产品数据...
]

product_html = ''

for product in products:
    product_html += '''
        <div class="col-md-4 pd_box">
            <div class="view_more">
                <a href="#" class="view_more_btn"><i class="fas fa-eye"></i></a>
            </div>
            <figure>
                <a href="#"><img src="{}" alt="Product Image"></a>
            </figure>
            <div class="product_info">
                <h2>{}</h2>
                <h3>{}</h3>
                <p>{}</p>
                <div class="price">{}</div>
                <div class="add_to_cart">
                    <i class="fas fa-cart-plus"></i>
                </div>
            </div>
        </div>
    '''.format(
        product['image'],
        product['title'],
        product['name'],
        product['description'],
        product['price']
    )

# 将生成的产品HTML代码传递给前端进行显示
