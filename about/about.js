// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
  const feedbackForm = document.getElementById('feedbackForm');
  
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 简单的表单验证
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('请填写所有必填字段');
        return;
      }
      
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      // 模拟表单提交
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // 禁用按钮并显示加载状态
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 提交中...';
      
      // 模拟API请求延迟
      setTimeout(() => {
        // 显示成功消息
        const form = document.getElementById('feedbackForm');
        form.innerHTML = `
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fa fa-check text-green-500 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">反馈提交成功！</h3>
            <p class="text-gray-medium">感谢您的反馈，我们会尽快处理并回复您</p>
            <button id="resetForm" class="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-custom">
              提交新反馈
            </button>
          </div>
        `;
        
        // 添加重置表单功能
        document.getElementById('resetForm').addEventListener('click', function() {
          window.location.reload();
        });
      }, 1500);
    });
  }
});