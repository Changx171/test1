// 网站动态功能
document.addEventListener('DOMContentLoaded', function() {
    // 显示当前网站信息
    document.getElementById('siteUrl').textContent = window.location.href;
    
    // 显示加载时间
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    document.getElementById('info').innerHTML = `
        <p><strong>网站URL：</strong>${window.location.href}</p>
        <p><strong>加载时间：</strong>${loadTime}ms</p>
        <p><strong>当前时间：</strong>${new Date().toLocaleString()}</p>
        <p><strong>用户代理：</strong>${navigator.userAgent.substring(0, 50)}...</p>
    `;
    
    // 回车键搜索
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') search();
    });
});

// 搜索功能
async function search() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('searchResults');
    
    if (!query) {
        resultsDiv.innerHTML = '<p style="color: #666;">请输入搜索词</p>';
        return;
    }
    
    resultsDiv.innerHTML = '<p>搜索中...</p>';
    
    try {
        // 这里可以替换成你的API地址
        // 示例：调用一个公开的测试API
        const response = await fetch(`https://api.publicapis.org/entries?title=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.entries && data.entries.length > 0) {
            resultsDiv.innerHTML = data.entries.slice(0, 5).map(entry => `
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h3 style="margin: 0 0 5px 0; color: #333;">${entry.API}</h3>
                    <p style="margin: 0 0 5px 0; color: #666;">${entry.Description}</p>
                    <p style="margin: 0; font-size: 0.9em; color: #888;">
                        <strong>分类：</strong>${entry.Category} | 
                        <strong>HTTPS：</strong>${entry.HTTPS ? '✅' : '❌'}
                    </p>
                </div>
            `).join('');
        } else {
            resultsDiv.innerHTML = `<p>没有找到"${query}"的相关结果</p>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: #e53e3e;">搜索失败: ${error.message}</p>`;
    }
}

// 添加一些动态效果
setInterval(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.boxShadow = `0 20px 40px rgba(0,0,0,${0.05 + Math.random() * 0.1})`;
    });
}, 3000);