// قائمة الأذكار
const adhkar = [
    { text: "سبحان الله وبحمده", recommended: 100 },
    { text: "لا إله إلا الله", recommended: 100 },
    { text: "الحمد لله", recommended: 100 },
    { text: "الله أكبر", recommended: 100 },
    { text: "لا حول ولا قوة إلا بالله", recommended: 100 },
    { text: "أستغفر الله", recommended: 100 }
];

let currentDhikr = 0;
let count = 0;

// عناصر DOM
const scoreElement = document.getElementById('score');
const tasbe7Element = document.getElementById('tasbe7');
const textElement = document.getElementById('text');
const circle = document.getElementById('circle');
const resetBtn = document.getElementById('resetBtn');
const changeDhikrBtn = document.getElementById('changeDhikrBtn');
const adhkarOptions = document.getElementById('adhkarOptions');
const mainContent = document.querySelector('.main-content');

// تهيئة التطبيق
function initApp() {
    // تأثير الدخول
    setTimeout(() => {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
    }, 2500);
    
    // تهيئة الأذكار
    initAdhkarOptions();
    
    // تعيين الحدث الأولي
    circle.addEventListener('click', countDhikr);
    resetBtn.addEventListener('click', resetCounter);
    changeDhikrBtn.addEventListener('click', changeDhikr);
}

// تهيئة خيارات الأذكار
function initAdhkarOptions() {
    adhkar.forEach((dhikr, index) => {
        const option = document.createElement('div');
        option.className = 'adhkar-option';
        if (index === currentDhikr) option.classList.add('active');
        option.textContent = dhikr.text;
        option.addEventListener('click', () => {
            setDhikr(index);
        });
        adhkarOptions.appendChild(option);
    });
}

// تعيين الذكر الحالي
function setDhikr(index) {
    currentDhikr = index;
    tasbe7Element.textContent = adhkar[currentDhikr].text;
    updateActiveOption();
    animateDhikrChange();
}

// تحديث الخيار النشط
function updateActiveOption() {
    document.querySelectorAll('.adhkar-option').forEach((option, index) => {
        option.classList.toggle('active', index === currentDhikr);
    });
}

// تأثير تغيير الذكر
function animateDhikrChange() {
    tasbe7Element.classList.add('glow');
    setTimeout(() => {
        tasbe7Element.classList.remove('glow');
    }, 500);
}

// عد التسبيحات
function countDhikr() {
    if (count === 0) {
        textElement.textContent = "اضغت هنا";
    }
    
    count++;
    scoreElement.textContent = count;
    scoreElement.classList.add('glow');
    
    setTimeout(() => {
        scoreElement.classList.remove('glow');
    }, 300);
    
    // تغيير الذكر عند الوصول للعدد الموصى به
    if (count % adhkar[currentDhikr].recommended === 0) {
        changeDhikr();
    }
}

// تغيير الذكر
function changeDhikr() {
    currentDhikr = (currentDhikr + 1) % adhkar.length;
    tasbe7Element.textContent = adhkar[currentDhikr].text;
    updateActiveOption();
    animateDhikrChange();
}

// إعادة العداد
function resetCounter() {
    count = 0;
    scoreElement.textContent = count;
    textElement.textContent = "ابدأ التسبيح";
    scoreElement.classList.add('glow');
    setTimeout(() => {
        scoreElement.classList.remove('glow');
    }, 300);
}

// تحديث حقوق الطبع والنشر
function updateCopyright() {
    const copyrightElement = document.getElementById('copyright');
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} جميع الحقوق محفوظة`;
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateCopyright();
});