document.addEventListener('DOMContentLoaded', () => {
    // 1. موازن أداء المؤشر المخصص (Custom Cursor)
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');

    if (cursor && dot) {
        document.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            
            // استخدام requestAnimationFrame أو translate3d للأداء العالي
            requestAnimationFrame(() => {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
                dot.style.left = `${x}px`;
                dot.style.top = `${y}px`;
            });
        });
    }

    // 2. القائمة المتنقلة ومنع التمرير (Hamburger Menu & Scroll Lock)
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            
            // منع التمرير في الخلفية عند فتح القائمة
            body.style.overflow = isOpen ? 'hidden' : '';
        });

        // إغلاق القائمة عند الضغط على أي رابط
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                body.style.overflow = '';
            });
        });
    }

    // 3. تأثيرات الظهور باستخدام IntersectionObserver (Scroll Reveal)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                // بمجرد ظهور العنصر، نتوقف عن مراقبته لتحسين الأداء
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. ضبط أبعاد الـ Hero Canvas عند تغيير حجم الشاشة
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // هنا يمكنك إعادة تشغيل أي رسوميات داخل الـ canvas إذا وجدت
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    }

    // 5. معالجة حقول الـ Select للتأكد من بقاء الـ Label في الأعلى
    const selects = document.querySelectorAll('.fg select');
    selects.forEach(select => {
        const checkValue = () => {
            if (select.value !== "") {
                select.classList.add('has-value');
            } else {
                select.classList.remove('has-value');
            }
        };

        select.addEventListener('change', checkValue);
        // التحقق عند التحميل الأولي (في حال كان هناك قيمة افتراضية)
        checkValue();
    });

    // إضافة تأثير "المغناطيس" البسيط للأزرار (اختياري لتحسين التجربة)
    const buttons = document.querySelectorAll('.btn-nav, .btn-primary, .btn-ghost');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
            btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});