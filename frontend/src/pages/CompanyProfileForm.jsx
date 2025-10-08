

// src/pages/CompanyProfileForm.jsx
import React, { useState, useEffect } from "react";
import TermsModal from "../components/TermsModal";
import "./CompanyProfile.css";
import "./CompanyProfileForm.css";
import { useParams, useNavigate } from "react-router-dom";


const messages = {
  en: {
    labels: {
      company: "Company Name",
      heading_create: "Welcome to Company Registration Portal",
      heading_edit: "Edit Company Profile",
      company_info: "Company Information",
      welcome: "Welcome",
      language_name: "English",
      company_id: "Company ID",
      company_name: "Company Name",
      description: "Description",
      address: "Address",
      owner: "Owner",
      email: "Email",
      mobile: "Mobile",
      landline: "Landline",
      category: "Category",
      subcategory: "Subcategory",
      discount: "Discount (%)",
      comments: "Comments",
      contract: "Upload Contract",
      agree_prefix: "I agree to",
      terms: "Terms & Conditions",
      cancel: "Cancel",
      approve: "Approve",
      update: "Update",
    },
    dropdowns: {
      select: "--Select--",
      categories: ["Hotel", "Retail"],
      subcategories: ["Health", "Grocery", "Fashion"],
    },
    errors: {
      company_id: "Company ID is required",
      company_name: "Company Name is required",
      description: "Description is required",
      address: "Address is required",
      owner: "Owner is required",
      email: "Valid email required",
      mobile: "Mobile must be 8–15 digits",
      discount_required: "Discount is required",
      discount_format: "Max 2-digit number",
      category: "Select category",
      subcategory: "Select subcategory",
      agree: "You must agree to Terms",
    },
    terms: {
      title: "Terms & Conditions",
      intro:
        "These terms and conditions outline the rules and regulations for using this service. By submitting this form, you agree to be bound by these terms.",
      points: [
        "Provide accurate company details.",
        "Ensure uploaded contracts are valid.",
        "Respect privacy and data handling rules.",
      ],
      outro:
        "If you disagree with these terms, you may not proceed with company registration.",
    },
  },

  fr: {
    labels: {
      company: "Nom de l’entreprise" ,
      heading_create: "Créer un profil d'entreprise",
      heading_edit: "Modifier le profil de l'entreprise",
      company_info: "Informations sur l'entreprise",
      welcome: "Bienvenue",
      language_name: "Français",
      company_id: "ID d'entreprise",
      company_name: "Nom de l'entreprise",
      description: "Description",
      address: "Adresse",
      owner: "Propriétaire",
      email: "Email",
      mobile: "Téléphone portable",
      landline: "Ligne fixe",
      category: "Catégorie",
      subcategory: "Sous-catégorie",
      discount: "Remise (%)",
      comments: "Commentaires",
      contract: "Télécharger le contrat",
      agree_prefix: "J'accepte",
      terms: "les conditions générales",
      no_file: "Aucun fichier choisi",
      cancel: "Annuler",
      approve: "Approuver",
      update: "Mettre à jour",
    },
    dropdowns: {
      select: "--Sélectionner--",
      categories: ["Hôtel", "Commerce de détail"],
      subcategories: ["Santé", "Épicerie", "Mode"],
    },
    errors: {
      company_id: "ID d'entreprise requis",
      company_name: "Nom de l'entreprise requis",
      description: "Description requise",
      address: "Adresse requise",
      owner: "Propriétaire requis",
      email: "Email valide requis",
      mobile: "Le mobile doit comporter 8 à 15 chiffres",
      discount_required: "La remise est obligatoire",
      discount_format: "Nombre maximum à 2 chiffres",
      category: "Sélectionnez une catégorie",
      subcategory: "Sélectionnez une sous-catégorie",
      agree: "Vous devez accepter les conditions",
    },
    terms: {
      title: "Conditions générales",
      intro:
        "Ces conditions générales définissent les règles et règlements pour utiliser ce service. En soumettant ce formulaire, vous acceptez d’être lié par ces conditions.",
      points: [
        "Fournir des informations exactes sur l'entreprise.",
        "S'assurer que les contrats téléchargés sont valides.",
        "Respecter la confidentialité et les règles de gestion des données.",
      ],
      outro:
        "Si vous n'acceptez pas ces conditions, vous ne pouvez pas procéder à l'enregistrement de l'entreprise.",
    },
  },

  ar: {
    labels: {
      company: "اسم الشركة",
      heading_create: "إنشاء ملف الشركة",
      heading_edit: "تعديل ملف الشركة",
      company_info: "معلومات الشركة",
      welcome: "أهلاً وسهلاً",
      language_name: "العربية",
      company_id: "معرف الشركة ",
      company_name: "اسم الشركة",
      description: "الوصف",
      address: "العنوان",
      owner: "المالك",
      email: "البريد الإلكتروني",
      mobile: "رقم الهاتف",
      landline: "الهاتف الأرضي",
      category: "الفئة",
      subcategory: "الفئة الفرعية",
      discount: "الخصم (%)",
      comments: "ملاحظات",
      contract: "تحميل العقد",
      agree_prefix: "أوافق على",
      terms: "الشروط والأحكام",
      no_file: "لم يتم اختيار ملف",
      cancel: "إلغاء",
      approve: "موافقة",
      update: "تحديث",
    },
    dropdowns: {
      select: "--اختر--",
      categories: ["فندق", "تجزئة"],
      subcategories: ["الصحة", "بقالة", "أزياء"],
    },
    errors: {
      company_id: "معرف الشركة مطلوب",
      company_name: "اسم الشركة مطلوب",
      description: "الوصف مطلوب",
      address: "العنوان مطلوب",
      owner: "المالك مطلوب",
      email: "البريد الإلكتروني غير صالح",
      mobile: "يجب أن يكون رقم الهاتف بين 8 و 15 رقمًا",
      discount_required: "الخصم مطلوب",
      discount_format: "الحد الأقصى رقم من رقمين",
      category: "اختر الفئة",
      subcategory: "اختر الفئة الفرعية",
      agree: "يجب أن توافق على الشروط",
    },
    terms: {
      title: "الشروط والأحكام",
      intro:
        "توضح هذه الشروط والأحكام القواعد واللوائح لاستخدام هذه الخدمة. من خلال إرسال هذا النموذج، فإنك توافق على الالتزام بهذه الشروط.",
      points: [
        "تقديم تفاصيل دقيقة عن الشركة.",
        "التأكد من أن العقود المرفوعة صالحة.",
        "احترام الخصوصية وقواعد معالجة البيانات.",
      ],
      outro: "إذا كنت لا توافق على هذه الشروط، فلا يمكنك المتابعة في تسجيل الشركة.",
    },
  },

   hi: {
    labels: {
      company: "कंपनी का नाम",
      heading_create: "कंपनी प्रोफ़ाइल बनाएं",
      heading_edit: "कंपनी प्रोफ़ाइल संपादित करें",
      company_info: "कंपनी की जानकारी",
      welcome: "स्वागत है",
      language_name: "हिन्दी",
      company_id: "कंपनी आईडी",
      company_name: "कंपनी का नाम",
      description: "विवरण",
      address: "पता",
      owner: "मालिक",
      email: "ईमेल",
      mobile: "मोबाइल",
      landline: "लैंडलाइन",
      category: "श्रेणी",
      subcategory: "उप-श्रेणी",
      discount: "छूट (%)",
      comments: "टिप्पणियाँ",
      contract: "अनुबंध अपलोड करें",
      agree_prefix: "मैं सहमत हूँ",
      terms: "नियम और शर्तें",
      no_file: "कोई फ़ाइल चयनित नहीं",
      cancel: "रद्द करें",
      approve: "स्वीकृत करें",
      update: "अपडेट करें",
    },
    dropdowns: {
      select: "--चुनें--",
      categories: ["होटल", "खुदरा"],
      subcategories: ["स्वास्थ्य", "किराना", "फैशन"],
    },
    errors: {
      company_id: "कंपनी आईडी आवश्यक है",
      company_name: "कंपनी का नाम आवश्यक है",
      description: "विवरण आवश्यक है",
      address: "पता आवश्यक है",
      owner: "मालिक आवश्यक है",
      email: "मान्य ईमेल आवश्यक है",
      mobile: "मोबाइल 8–15 अंकों का होना चाहिए",
      discount_required: "छूट आवश्यक है",
      discount_format: "अधिकतम 2-अंकीय संख्या",
      category: "श्रेणी चुनें",
      subcategory: "उप-श्रेणी चुनें",
      agree: "आपको नियमों से सहमत होना चाहिए",
    },
    terms: {
      title: "नियम और शर्तें",
      intro:
        "ये नियम और शर्तें सेवा के उपयोग के लिए नियमों को बताती हैं। इस फ़ॉर्म को जमा करके, आप इन शर्तों से सहमत होते हैं।",
      points: [
        "कंपनी की सटीक जानकारी प्रदान करें।",
        "सुनिश्चित करें कि अपलोड किया गया अनुबंध वैध है।",
        "गोपनीयता और डेटा प्रोसेसिंग नीतियों का पालन करें।",
      ],
      outro: "यदि आप इन शर्तों से सहमत नहीं हैं, तो आप आगे नहीं बढ़ सकते।",
    },
  },
  ja: {
    labels: {
      company: "会社名",
      heading_create: "会社プロフィールを作成",
      heading_edit: "会社プロフィールを編集",
      company_info: "会社情報",
      welcome: "ようこそ",
      language_name: "日本語",
      company_id: "会社ID",
      company_name: "会社名",
      description: "説明",
      address: "住所",
      owner: "オーナー",
      email: "メール",
      mobile: "携帯電話",
      landline: "固定電話",
      category: "カテゴリー",
      subcategory: "サブカテゴリー",
      discount: "割引 (%)",
      comments: "コメント",
      contract: "契約をアップロード",
      agree_prefix: "私は同意します",
      terms: "利用規約",
      no_file: "ファイルが選択されていません",
      cancel: "キャンセル",
      approve: "承認",
      update: "更新",
    },
    dropdowns: {
      select: "--選択--",
      categories: ["ホテル", "小売"],
      subcategories: ["健康", "食料品", "ファッション"],
    },
    errors: {
      company_id: "会社IDは必須です",
      company_name: "会社名は必須です",
      description: "説明は必須です",
      address: "住所は必須です",
      owner: "オーナーは必須です",
      email: "有効なメールが必要です",
      mobile: "携帯番号は8〜15桁である必要があります",
      discount_required: "割引は必須です",
      discount_format: "最大2桁の数字",
      category: "カテゴリーを選択してください",
      subcategory: "サブカテゴリーを選択してください",
      agree: "利用規約に同意する必要があります",
    },
    terms: {
      title: "利用規約",
      intro: "このサービスの使用に関するルールを説明します。フォームを送信することで、これらの条件に同意したものとみなされます。",
      points: [
        "正確な会社情報を提供してください。",
        "アップロードされた契約が有効であることを確認してください。",
        "プライバシーとデータ処理ルールを尊重してください。",
      ],
      outro: "これらの条件に同意しない場合は、会社登録を続行できません。",
    },
  },

 ch: {
    labels: {
      company: "公司名称",
      heading_create: "创建公司档案",
      heading_edit: "编辑公司档案",
      company_info: "公司信息",
      welcome: "欢迎",
      language_name: "中文",
      company_id: "公司编号",
      company_name: "公司名称",
      description: "描述",
      address: "地址",
      owner: "所有者",
      email: "电子邮件",
      mobile: "手机",
      landline: "座机",
      category: "类别",
      subcategory: "子类别",
      discount: "折扣 (%)",
      comments: "评论",
      contract: "上传合同",
      agree_prefix: "我同意",
      terms: "条款和条件",
      no_file: "未选择文件",
      cancel: "取消",
      approve: "批准",
      update: "更新",
    },
    dropdowns: {
      select: "--请选择--",
      categories: ["酒店", "零售"],
      subcategories: ["健康", "杂货", "时尚"],
    },
    errors: {
      company_id: "公司编号是必填项",
      company_name: "公司名称是必填项",
      description: "描述是必填项",
      address: "地址是必填项",
      owner: "所有者是必填项",
      email: "请输入有效的电子邮件地址",
      mobile: "手机号必须为8到15位数字",
      discount_required: "折扣是必填项",
      discount_format: "最多两位数字",
      category: "请选择类别",
      subcategory: "请选择子类别",
      agree: "您必须同意条款",
    },
    terms: {
      title: "条款和条件",
      intro: "本条款和条件说明了使用此服务的规则和规定。提交此表单即表示您同意遵守这些条款。",
      points: [
        "提供准确的公司详细信息。",
        "确保上传的合同有效。",
        "尊重隐私并遵守数据处理规则。",
      ],
      outro: "如果您不同意这些条款，则无法继续注册公司。",
    },
  },


   sp: {
    labels: {
      company: "Nombre de la empresa",
      heading_create: "Crear perfil de la empresa",
      heading_edit: "Editar perfil de la empresa",
      company_info: "Información de la empresa",
      welcome: "Bienvenido",
      language_name: "Español",
      company_id: "ID de la empresa",
      company_name: "Nombre de la empresa",
      description: "Descripción",
      address: "Dirección",
      owner: "Propietario",
      email: "Correo electrónico",
      mobile: "Móvil",
      landline: "Teléfono fijo",
      category: "Categoría",
      subcategory: "Subcategoría",
      discount: "Descuento (%)",
      comments: "Comentarios",
      contract: "Subir contrato",
      agree_prefix: "Acepto",
      terms: "Términos y condiciones",
      no_file: "Ningún archivo seleccionado",
      cancel: "Cancelar",
      approve: "Aprobar",
      update: "Actualizar",
    },
    dropdowns: {
      select: "--Seleccione--",
      categories: ["Hotel", "Venta minorista"],
      subcategories: ["Salud", "Comestibles", "Moda"],
    },
    errors: {
      company_id: "ID de la empresa es obligatorio",
      company_name: "Nombre de la empresa es obligatorio",
      description: "Descripción es obligatoria",
      address: "Dirección es obligatoria",
      owner: "Propietario es obligatorio",
      email: "Correo electrónico válido requerido",
      mobile: "El móvil debe tener entre 8 y 15 dígitos",
      discount_required: "El descuento es obligatorio",
      discount_format: "Número máximo de 2 dígitos",
      category: "Seleccione una categoría",
      subcategory: "Seleccione una subcategoría",
      agree: "Debe aceptar los términos",
    },
    terms: {
      title: "Términos y condiciones",
      intro: "Estos términos y condiciones establecen las reglas para el uso de este servicio. Al enviar este formulario, acepta cumplir con ellos.",
      points: [
        "Proporcione información precisa de la empresa.",
        "Asegúrese de que los contratos cargados sean válidos.",
        "Respete la privacidad y las normas de procesamiento de datos.",
      ],
      outro: "Si no está de acuerdo con estos términos, no podrá continuar con el registro.",
    },
  },

  ge: {
    labels: {
      company: "Firmenname",
      heading_create: "Unternehmensprofil erstellen",
      heading_edit: "Unternehmensprofil bearbeiten",
      company_info: "Unternehmensinformationen",
      welcome: "Willkommen",
      language_name: "Deutsch",
      company_id: "Firmen-ID",
      company_name: "Firmenname",
      description: "Beschreibung",
      address: "Adresse",
      owner: "Inhaber",
      email: "E-Mail",
      mobile: "Mobiltelefon",
      landline: "Festnetz",
      category: "Kategorie",
      subcategory: "Unterkategorie",
      discount: "Rabatt (%)",
      comments: "Kommentare",
      contract: "Vertrag hochladen",
      agree_prefix: "Ich stimme zu",
      terms: "Geschäftsbedingungen",
      no_file: "Keine Datei ausgewählt",
      cancel: "Abbrechen",
      approve: "Genehmigen",
      update: "Aktualisieren",
    },
    dropdowns: {
      select: "--Wählen--",
      categories: ["Hotel", "Einzelhandel"],
      subcategories: ["Gesundheit", "Lebensmittel", "Mode"],
    },
    errors: {
      company_id: "Firmen-ID ist erforderlich",
      company_name: "Firmenname ist erforderlich",
      description: "Beschreibung ist erforderlich",
      address: "Adresse ist erforderlich",
      owner: "Inhaber ist erforderlich",
      email: "Gültige E-Mail-Adresse erforderlich",
      mobile: "Mobilnummer muss zwischen 8 und 15 Ziffern haben",
      discount_required: "Rabatt ist erforderlich",
      discount_format: "Maximal zweistellige Zahl",
      category: "Kategorie auswählen",
      subcategory: "Unterkategorie auswählen",
      agree: "Sie müssen den Bedingungen zustimmen",
    },
    terms: {
      title: "Geschäftsbedingungen",
      intro: "Diese Bedingungen legen die Regeln für die Nutzung dieses Dienstes fest. Mit dem Absenden dieses Formulars erklären Sie sich mit diesen Bedingungen einverstanden.",
      points: [
        "Geben Sie genaue Unternehmensdaten an.",
        "Stellen Sie sicher, dass hochgeladene Verträge gültig sind.",
        "Respektieren Sie Datenschutz- und Datenverarbeitungsrichtlinien.",
      ],
      outro: "Wenn Sie diesen Bedingungen nicht zustimmen, können Sie die Registrierung nicht fortsetzen.",
    },
  },


ru: {
    labels: {
      company: "Название компании",
      heading_create: "Создать профиль компании",
      heading_edit: "Редактировать профиль компании",
      company_info: "Информация о компании",
      welcome: "Добро пожаловать",
      language_name: "Русский",
      company_id: "ID компании",
      company_name: "Название компании",
      description: "Описание",
      address: "Адрес",
      owner: "Владелец",
      email: "Эл. почта",
      mobile: "Мобильный телефон",
      landline: "Стационарный телефон",
      category: "Категория",
      subcategory: "Подкатегория",
      discount: "Скидка (%)",
      comments: "Комментарии",
      contract: "Загрузить контракт",
      agree_prefix: "Я согласен с",
      terms: "условиями",
      no_file: "Файл не выбран",
      cancel: "Отмена",
      approve: "Одобрить",
      update: "Обновить",
    },
    dropdowns: {
      select: "--Выберите--",
      categories: ["Отель", "Розничная торговля"],
      subcategories: ["Здоровье", "Продукты", "Мода"],
    },
    errors: {
      company_id: "Идентификатор компании обязателен",
      company_name: "Название компании обязательно",
      description: "Описание обязательно",
      address: "Адрес обязателен",
      owner: "Имя владельца обязательно",
      email: "Требуется действительный адрес электронной почты",
      mobile: "Номер телефона должен содержать от 8 до 15 цифр",
      discount_required: "Скидка обязательна",
      discount_format: "Максимум двухзначное число",
      category: "Выберите категорию",
      subcategory: "Выберите подкатегорию",
      agree: "Вы должны согласиться с условиями",
    },
    terms: {
      title: "Условия и положения",
      intro: "Эти условия определяют правила использования данного сервиса. Отправляя форму, вы соглашаетесь соблюдать эти правила.",
      points: [
        "Предоставляйте точные данные о компании.",
        "Убедитесь, что загружаемые контракты действительны.",
        "Соблюдайте правила конфиденциальности и обработки данных.",
      ],
      outro: "Если вы не согласны с условиями, вы не можете продолжить регистрацию компании.",
    },
  },


  po: {
    labels: {
      company: "Nome da empresa",
      heading_create: "Criar perfil da empresa",
      heading_edit: "Editar perfil da empresa",
      company_info: "Informações da empresa",
      welcome: "Bem-vindo",
      language_name: "Português",
      company_id: "ID da empresa",
      company_name: "Nome da empresa",
      description: "Descrição",
      address: "Endereço",
      owner: "Proprietário",
      email: "Email",
      mobile: "Celular",
      landline: "Telefone fixo",
      category: "Categoria",
      subcategory: "Subcategoria",
      discount: "Desconto (%)",
      comments: "Comentários",
      contract: "Carregar contrato",
      agree_prefix: "Eu concordo com",
      terms: "os termos e condições",
      no_file: "Nenhum arquivo selecionado",
      cancel: "Cancelar",
      approve: "Aprovar",
      update: "Atualizar",
    },
    dropdowns: {
      select: "--Selecionar--",
      categories: ["Hotel", "Varejo"],
      subcategories: ["Saúde", "Mercearia", "Moda"],
    },
    errors: {
      company_id: "O ID da empresa é obrigatório",
      company_name: "O nome da empresa é obrigatório",
      description: "A descrição é obrigatória",
      address: "O endereço é obrigatório",
      owner: "O proprietário é obrigatório",
      email: "É necessário um e-mail válido",
      mobile: "O celular deve ter entre 8 e 15 dígitos",
      discount_required: "O desconto é obrigatório",
      discount_format: "Número máximo de 2 dígitos",
      category: "Selecione uma categoria",
      subcategory: "Selecione uma subcategoria",
      agree: "Você deve aceitar os termos",
    },
    terms: {
      title: "Termos e Condições",
      intro: "Estes termos e condições descrevem as regras de uso deste serviço. Ao enviar este formulário, você concorda com estes termos.",
      points: [
        "Forneça informações precisas da empresa.",
        "Certifique-se de que os contratos carregados sejam válidos.",
        "Respeite a privacidade e as regras de processamento de dados.",
      ],
      outro: "Se você não concordar com estes termos, não poderá continuar com o registro da empresa.",
    },
  },
};


// export default function CompanyProfileForm() {
//    const BASE_LANGS = ["en", "fr", "ar"];
//   const [extraLangs, setExtraLangs] = useState([]); 
//   const [activeLang, setActiveLang] = useState("en");
//   const [form, setForm] = useState({
//   company_id: "",
//   languages: {
//     en: { company: "", desc: "", address: "", owner: "" },
//     fr: { company: "", desc: "", address: "", owner: "" },
//     ar: { company: "", desc: "", address: "", owner: "" },
//   },
//   email: "",
//   mobile: "",
//   landline: "",
//   category: "",
//   subcategory: "",
//   discount: "",
//   comments: "",
//   agree: false,
// });

  // const [form, setForm] = useState({
  //   company_id: "",
  //   companyEn: "",
  //   descEn: "",
  //   addressEn: "",
  //   ownerEn: "",
  //   companyFr: "",
  //   descFr: "",
  //   addressFr: "",
  //   ownerFr: "",
  //   companyAr: "",
  //   descAr: "",
  //   addressAr: "",
  //   ownerAr: "",
  //   email: "",
  //   mobile: "",
  //   landline: "",
  //   category: "",
  //   subcategory: "",
  //   discount: "",
  //   comments: "",
  //   agree: false,
  // });

//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [showTerms, setShowTerms] = useState(false);

//   const { id } = useParams(); // edit mode if id exists
//   const navigate = useNavigate();

//   // Fetch existing company data when editing
//   useEffect(() => {
//     if (id) {
//       const fetchCompany = async () => {
//         try {
//           const base = import.meta.env.VITE_API_URL || "";
//           console.log("📡 Fetching company:", `${base}/api/companies/${id}`); // log request URL
//           const res = await fetch(`${base}/api/companies/${id}`);
//           const response = await res.json();

//           if (response.success) {
//             const c = response.data;
//             setForm((prev) => ({
//               ...prev,
//               company_id: c.company_id,
//               email: c.email,
//               mobile: c.mobile,
//               landline: c.landline,
//               category: c.category,
//               subcategory: c.subcategory,
//               discount: c.discount,
//               comments: c.comments,

//               companyEn: c.properties?.EN?.company_name || "",
//               descEn: c.properties?.EN?.description || "",
//               addressEn: c.properties?.EN?.address || "",
//               ownerEn: c.properties?.EN?.owner_name || "",

//               companyFr: c.properties?.FR?.company_name || "",
//               descFr: c.properties?.FR?.description || "",
//               addressFr: c.properties?.FR?.address || "",
//               ownerFr: c.properties?.FR?.owner_name || "",

//               companyAr: c.properties?.AR?.company_name || "",
//               descAr: c.properties?.AR?.description || "",
//               addressAr: c.properties?.AR?.address || "",
//               ownerAr: c.properties?.AR?.owner_name || "",
//             }));
//           }
//         } catch (err) {
//           console.error("❌ Failed to load company:", err);
//         }
//       };

//       fetchCompany();
//     }
//   }, [id]);

//   const has = (s) => !!(s && s.trim());
//   const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validate = (f) => {
//     const e = {};
//     const t = messages[activeLang].errors;

//     if (!has(f.company_id)) e.company_id = t.company_id;

//     if (activeLang === "en") {
//       if (!has(f.companyEn)) e.companyEn = t.company_name;
//       if (!has(f.descEn)) e.descEn = t.description;
//       if (!has(f.addressEn)) e.addressEn = t.address;
//       if (!has(f.ownerEn)) e.ownerEn = t.owner;
//     }
//     if (activeLang === "fr") {
//       if (!has(f.companyFr)) e.companyFr = t.company_name;
//       if (!has(f.descFr)) e.descFr = t.description;
//       if (!has(f.addressFr)) e.addressFr = t.address;
//       if (!has(f.ownerFr)) e.ownerFr = t.owner;
//     }
//     if (activeLang === "ar") {
//       if (!has(f.companyAr)) e.companyAr = t.company_name;
//       if (!has(f.descAr)) e.descAr = t.description;
//       if (!has(f.addressAr)) e.addressAr = t.address;
//       if (!has(f.ownerAr)) e.ownerAr = t.owner;
//     }

//     if (!emailRx.test(f.email)) e.email = t.email;
//     if (!/^\d{8,15}$/.test(String(f.mobile || ""))) e.mobile = t.mobile;
//     if (!has(f.discount)) e.discount = t.discount_required;
//     else if (!/^\d{1,2}$/.test(f.discount)) e.discount = t.discount_format;
//     if (!f.category) e.category = t.category;
//     if (!f.subcategory) e.subcategory = t.subcategory;
//     if (!f.agree) e.agree = t.agree;

//     return e;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === "checkbox" ? checked : value;
//     setForm((prev) => ({ ...prev, [name]: val }));
//     setErrors((prev) => {
//       const updated = { ...prev };
//       if (has(val)) delete updated[name];
//       return updated;
//     });
//   };

//   const handleFile = (e) => setFile(e.target.files?.[0] || null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length > 0) return;

//     const fd = new FormData();
//     fd.append("company_id", form.company_id);
//     fd.append("email", form.email);
//     fd.append("mobile", form.mobile);
//     fd.append("landline", form.landline);
//     fd.append("category", form.category);
//     fd.append("subcategory", form.subcategory);
//     fd.append("discount", form.discount);
//     fd.append("comments", form.comments);
//     if (file) fd.append("contract", file);

//     let activeProperties = {};
//     if (activeLang === "en") {
//       activeProperties = {
//         EN: {
//           company_name: form.companyEn,
//           description: form.descEn,
//           address: form.addressEn,
//           owner_name: form.ownerEn,
//         },
//       };
//     } else if (activeLang === "fr") {
//       activeProperties = {
//         FR: {
//           company_name: form.companyFr,
//           description: form.descFr,
//           address: form.addressFr,
//           owner_name: form.ownerFr,
//         },
//       };
//     } else if (activeLang === "ar") {
//       activeProperties = {
//         AR: {
//           company_name: form.companyAr,
//           description: form.descAr,
//           address: form.addressAr,
//           owner_name: form.ownerAr,
//         },
//       };
//     }
//     fd.append("properties", JSON.stringify(activeProperties));

//     try {
//       const base = import.meta.env.VITE_API_URL || "";
//       const url = id
//         ? `${base}/api/companies/${id}` // update
//         : `${base}/api/companies`; // create
//       const method = id ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         body: fd,
//       });

//       const response = await res.json();
//       if (!res.ok) {
//         alert(`❌ Failed to save company: ${response.error || "Unknown error"}`);
//         return;
//       }

//       alert(id ? "✅ Company updated successfully!" : "✅ Company created successfully!");
//       navigate("/company-profile");
//     } catch (err) {
//       console.error("❌ Error:", err);
//       alert("❌ Failed to save company: " + err.message);
//     }
//   };

//   const langKey = activeLang.charAt(0).toUpperCase() + activeLang.slice(1);

//   return (
//     <div className="register-container">
//      <header className="banner" dir={activeLang === "ar" ? "rtl" : "ltr"}>
//   <h1>
//     {id
//       ? messages[activeLang].labels.heading_edit
//       : messages[activeLang].labels.heading_create}
//   </h1>
// </header>

// <main className="form-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
//   <h2>{messages[activeLang].labels.company_info}</h2>

//         <form onSubmit={handleSubmit} autoComplete="off">
//           {/* Company ID */}
//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.company_id}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="company_id"
//                // placeholder="Enter Company ID"
//                 value={form.company_id}
//                 onChange={handleChange}
//                 disabled={!!id} // lock when editing
//               />
//               {errors.company_id && <p className="error">{errors.company_id}</p>}
//             </div>
//           </div>

//           {/* Language tabs */}
//           <div className="lang-tabs">
//             <button
//               className={`lang-btn ${activeLang === "en" ? "active" : ""}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveLang("en");
//               }}
//             >
//               English
//             </button>
//             <button
//               className={`lang-btn ${activeLang === "fr" ? "active" : ""}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveLang("fr");
//               }}
//             >
//               Français
//             </button>
//             <button
//               className={`lang-btn ${activeLang === "ar" ? "active" : ""}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveLang("ar");
//               }}
//             >
//                العربية
//             </button>
//           </div>

//           {/* Language card */}
//           <div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
//             <h3 className="welcome-heading">{messages[activeLang].labels.welcome}</h3>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.company_name}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 name={`company${langKey}`}
//                 value={form[`company${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`company${langKey}`] && (
//                 <p className="error">{errors[`company${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.description}
//                 <span className="required">*</span>
//               </label>
//               <textarea
//                 name={`desc${langKey}`}
//                 rows="3"
//                 value={form[`desc${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`desc${langKey}`] && (
//                 <p className="error">{errors[`desc${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.address}
//                 <span className="required">*</span>
//               </label>
//               <textarea
//                 name={`address${langKey}`}
//                 rows="3"
//                 value={form[`address${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`address${langKey}`] && (
//                 <p className="error">{errors[`address${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.owner}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 name={`owner${langKey}`}
//                 value={form[`owner${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`owner${langKey}`] && (
//                 <p className="error">{errors[`owner${langKey}`]}</p>
//               )}
//             </div>
//           </div>

//           {/* Global fields */}
//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.email}
//                 <span className="required">*</span>
//               </label>
//               <input type="email" name="email" value={form.email} onChange={handleChange} />
//               {errors.email && <p className="error">{errors.email}</p>}
//             </div>
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.mobile}
//                 <span className="required">*</span>
//               </label>
//               <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} />
//               {errors.mobile && <p className="error">{errors.mobile}</p>}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>{messages[activeLang].labels.landline}</label>
//               <input type="tel" name="landline" value={form.landline} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="row">
//   <div className="col">
//     <label>
//       {messages[activeLang].labels.category}
//       <span className="required">*</span>
//     </label>
//     <select
//       name="category"
//       value={form.category}
//       onChange={handleChange}
//       dir={activeLang === "ar" ? "rtl" : "ltr"}  // ✅ RTL for Arabic
//     >
//       <option value="">{messages[activeLang].dropdowns.select}</option>
//       {messages[activeLang].dropdowns.categories.map((cat, i) => (
//         <option key={i} value={cat}>{cat}</option>
//       ))}
//     </select>
//     {errors.category && <p className="error">{errors.category}</p>}
//   </div>

//   <div className="col">
//     <label>
//       {messages[activeLang].labels.subcategory}
//       <span className="required">*</span>
//     </label>
//     <select
//       name="subcategory"
//       value={form.subcategory}
//       onChange={handleChange}
//       dir={activeLang === "ar" ? "rtl" : "ltr"}  // ✅ RTL for Arabic
//     >
//       <option value="">{messages[activeLang].dropdowns.select}</option>
//       {messages[activeLang].dropdowns.subcategories.map((sub, i) => (
//         <option key={i} value={sub}>{sub}</option>
//       ))}
//     </select>
//     {errors.subcategory && <p className="error">{errors.subcategory}</p>}
//   </div>
// </div>


//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.discount}
//                 <span className="required">*</span>
//               </label>
//               <input name="discount" value={form.discount} onChange={handleChange} />
//               {errors.discount && <p className="error">{errors.discount}</p>}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>{messages[activeLang].labels.comments}</label>
//               <textarea name="comments" rows="3" value={form.comments} onChange={handleChange} />
//             </div>
//           </div>

// {/* File Upload */}

// <div className="row">
//   <div className="col file-upload">
//     <label htmlFor="contract" className="custom-file-label">
//       📤 {messages[activeLang].labels.contract}
//     </label>
//     <input
//       id="contract"
//       type="file"
//       name="contract"
//       accept=".pdf,.png,.jpg,.jpeg"
//       onChange={(e) => setFile(e.target.files[0])}
//       style={{ display: "none" }}
//     />
//     <span className="file-name">
//       {file ? file.name : messages[activeLang].labels.no_file}
//     </span>
//   </div>
// </div>



// {/* Terms & Conditions */}
// <div className="row">
//   <div className="col terms">
//     <label className="terms-label">
//       <div
//         className={`toggle-switch ${form.agree ? "on" : ""}`}
//         onClick={() => setForm((prev) => ({ ...prev, agree: !prev.agree }))}
//       >
//         <div className="toggle-slider"></div>
//       </div>
//       <span>
//         {messages[activeLang].labels.agree_prefix}{" "}
//         <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             setShowTerms(true);
//           }}
//         >
//           {messages[activeLang].labels.terms}
//         </a>
//       </span>
//     </label>
//     {errors.agree && <p className="error">{errors.agree}</p>}
//   </div>
// </div>


// <TermsModal 
//   open={showTerms} 
//   onClose={() => setShowTerms(false)} 
//   activeLang={activeLang} 
// />



//           {/* Buttons */}
//    <div className="button-group">
//   <button
//     type="button"
//     className="btn cancel"
//     onClick={() => navigate("/company-profile")}
//   >
//     {messages[activeLang].labels.cancel}
//   </button>
//   <button type="submit" className="btn submit">
//     {id
//       ? messages[activeLang].labels.update
//       : messages[activeLang].labels.approve}
//   </button>
// </div>


//         </form>
//       </main>

//       <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
//     </div>
//   );
// }

export default function CompanyProfileForm() {
   const BASE_LANGS = ["en", "fr", "ar"];
  const [extraLangs, setExtraLangs] = useState([]); 
  const [activeLang, setActiveLang] = useState("en");
  const [form, setForm] = useState({
  company_id: "",
  languages: {
    en: { company: "", desc: "", address: "", owner: "" },
    fr: { company: "", desc: "", address: "", owner: "" },
    ar: { company: "", desc: "", address: "", owner: "" },
  },
  email: "",
  mobile: "",
  landline: "",
  category: "",
  subcategory: "",
  discount: "",
  comments: "",
  agree: false,
});

 const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // // 🧠 Load dynamically added languages from LanguageSettings localStorage
  // useEffect(() => {
  //   const saved = localStorage.getItem("addedLangs");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     setExtraLangs(parsed.map((id) => id.toLowerCase()));
  //   }
  // }, []);


  // 🧠 1️⃣ Load dynamically added languages from LanguageSettings localStorage
useEffect(() => {
  const saved = localStorage.getItem("addedLangs");
  if (saved) {
    const parsed = JSON.parse(saved);
    setExtraLangs(parsed.map((id) => id.toLowerCase()));
  }
}, []);

// 🧠 2️⃣ Fetch existing company data if editing
useEffect(() => {
  if (!id) return; // only run when editing

  const fetchCompany = async () => {
    try {
      const base = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${base}/api/companies/${id}`);
      if (!res.ok) throw new Error("Failed to fetch company data");

      const data = await res.json();
      if (!data || !data.data) throw new Error("Invalid response structure");

      const c = data.data;

      // 🔁 Build dynamic languages from backend data
      const fetchedLanguages = {};
      for (const [langCode, vals] of Object.entries(c.properties || {})) {
        fetchedLanguages[langCode.toLowerCase()] = {
          company: vals.company_name || "",
          desc: vals.description || "",
          address: vals.address || "",
          owner: vals.owner_name || "",
        };
      }

      // 🌍 Merge with base + user-added languages
      const allLangs = ["en", "fr", "ar", ...extraLangs];
      const finalLanguages = {};
      allLangs.forEach((lang) => {
        finalLanguages[lang] = fetchedLanguages[lang] || {
          company: "",
          desc: "",
          address: "",
          owner: "",
        };
      });

      // 🏗️ Update form
      setForm({
        company_id: c.company_id || "",
        email: c.email || "",
        mobile: c.mobile || "",
        landline: c.landline || "",
        category: c.category || "",
        subcategory: c.subcategory || "",
        discount: c.discount || "",
        comments: c.comments || "",
        agree: true,
        languages: finalLanguages,
      });
    } catch (err) {
      console.error("❌ Error fetching company:", err);
      alert("❌ Failed to load company data");
    }
  };

  fetchCompany();
}, [id, extraLangs]);

  // Validation
  const has = (s) => !!(s && s.trim());
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validate = (f) => {
//   const e = {};
//   const t = messages[activeLang]?.errors || messages.en.errors;
//   const langCode = activeLang.toLowerCase(); // lowercase (en, fr, ar)

//   const langData = f.languages?.[langCode] || {};

//   if (!has(f.company_id)) e.company_id = t.company_id;
//   // ✅ Check across all languages
// const hasCompanyName = Object.values(f.languages || {}).some(
//   (lang) => lang.company && lang.company.trim() !== ""
// );
// if (!hasCompanyName) e.company_name = "Company name is required in at least one language.";

//  // if (!has(langData.company)) e.company_name = t.company_name;
//   if (!has(langData.desc)) e.description = t.description;
//   if (!has(langData.address)) e.address = t.address;
//   if (!has(langData.owner)) e.owner = t.owner;
//   if (!emailRx.test(f.email)) e.email = t.email;
//   if (!/^\d{8,15}$/.test(String(f.mobile || ""))) e.mobile = t.mobile;
//   if (!has(f.discount)) e.discount = t.discount_required;
// else if (!/^\d{1,2}(\.\d{1,2})?$/.test(f.discount)) e.discount = t.discount_format;

//   if (!f.category) e.category = t.category;
//   if (!f.subcategory) e.subcategory = t.subcategory;
//   if (!f.agree) e.agree = t.agree;

//   return e;
// };
const validate = (f) => {
  const e = {};
  const t = messages[activeLang]?.errors || messages.en.errors;
  const langCode = activeLang.toLowerCase(); // e.g., 'en', 'fr', 'ar'
  const langData = f.languages?.[langCode] || {};

  // 🔹 Helper function
  const has = (val) => val && val.trim() !== "";

  // 🌍 Global fields
  if (!has(f.company_id)) e.company_id = t.company_id;

  // ✅ Company name must exist in at least one language
  const hasCompanyName = Object.values(f.languages || {}).some(
    (lang) => has(lang.company)
  );
  if (!hasCompanyName)
    e.company_name = t.company_name_required || "Company name is required in at least one language.";

  // 🈯 Language-specific required fields (for current active language)
  if (!has(langData.company)) e.company = t.company_name || "Company name is required.";
  if (!has(langData.desc)) e.description = t.description || "Description is required.";
  if (!has(langData.address)) e.address = t.address || "Address is required.";
  if (!has(langData.owner)) e.owner = t.owner || "Owner is required.";

  // ✉️ Email validation
  const emailRx = /\S+@\S+\.\S+/;
  if (!emailRx.test(f.email)) e.email = t.email || "Enter a valid email.";

  // 📞 Mobile validation (8–15 digits)
  if (!/^\d{8,15}$/.test(String(f.mobile || "")))
    e.mobile = t.mobile || "Enter a valid mobile number.";

  // 💸 Discount validation
  if (!has(f.discount)) e.discount = t.discount_required || "Discount is required.";
  else if (!/^\d{1,2}(\.\d{1,2})?$/.test(f.discount))
    e.discount = t.discount_format || "Invalid discount format.";

  // 📂 Dropdowns
  if (!f.category) e.category = t.category || "Category is required.";
  if (!f.subcategory) e.subcategory = t.subcategory || "Subcategory is required.";

  // ✅ Terms & Conditions
  if (!f.agree) e.agree = t.agree || "You must agree to continue.";

  return e;
};



// const handleChange = (e, lang = null) => {
//   const { name, value, type, checked } = e.target;
//   const val = type === "checkbox" ? checked : value;

//   if (lang) {
//     // 🈯 language-specific field
//     setForm((prev) => ({
//       ...prev,
//       languages: {
//         ...prev.languages,
//         [lang]: {
//           ...prev.languages[lang],
//           [name]: val,
//         },
//       },
//     }));
//   } else {
//     // 🌍 shared global field
//     setForm((prev) => ({
//       ...prev,
//       [name]: val,
//     }));
//   }
// };

const handleChange = (e, lang = null) => {
  const { name, value, type, checked } = e.target;
  const val = type === "checkbox" ? checked : value;

  // 🟢 Update state
  setForm((prev) => {
    if (lang) {
      // 🔤 language-specific field (e.g., company_name, desc, address)
      return {
        ...prev,
        languages: {
          ...prev.languages,
          [lang]: {
            ...prev.languages[lang],
            [name]: val,
          },
        },
      };
    } else {
      // 🌍 global field
      return { ...prev, [name]: val };
    }
  });

  // 🧹 Clear validation dynamically as soon as valid value is entered
  setErrors((prev) => {
    const newErrors = { ...prev };

    // 🌍 Global field validations
    if (!lang) {
      // ✅ Remove generic "required" error when non-empty
      if (val && val.trim() !== "") delete newErrors[name];

      // ✅ Specific field validations
      if (name === "email" && /\S+@\S+\.\S+/.test(val)) delete newErrors[name];
      if (name === "mobile" && /^\d{6,15}$/.test(val)) delete newErrors[name];
      if (name === "discount" && /^\d+(\.\d{1,2})?$/.test(val))
        delete newErrors[name];
      if (
        (name === "category" || name === "subcategory") &&
        val.trim() !== ""
      )
        delete newErrors[name];
      if (name === "company_id" && val.trim() !== "") delete newErrors[name];
      if (name === "comments" && val.trim() !== "") delete newErrors[name];
    }

    // 🈯 Language-specific field validations
    if (lang) {
      const langErrors = { ...(newErrors[lang] || {}) };

      // Remove required/empty error when text is entered
      if (val && val.trim() !== "") delete langErrors[name];

      // If nested language errors exist, update them
      if (Object.keys(langErrors).length > 0) {
        newErrors[lang] = langErrors;
      } else {
        delete newErrors[lang];
      }
    }

    return newErrors;
  });
};

const handleFieldChange = (e, langCode = null) => {
  const { name, value } = e.target;

  // 🔹 Update form state
  if (langCode) {
    setForm((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [langCode]: {
          ...prev.languages[langCode],
          [name]: value,
        },
      },
    }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 🔹 Clear validation message as soon as value becomes valid
  setErrors((prev) => {
    const newErrors = { ...prev };

    if (value && value.trim() !== "") {
      delete newErrors[name];
    }

    // For language-specific fields (like desc, owner, etc.)
    if (langCode && newErrors[langCode]?.[name]) {
      newErrors[langCode][name] = "";
    }

    return newErrors;
  });
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🟢 handleSubmit triggered");

  console.log("🌍 Current form.languages:", form.languages);

  const v = validate(form);
  setErrors(v);

  if (Object.keys(v).length > 0) {
    console.warn("⚠️ Validation failed:", v);
    alert("⚠️ Please fix validation errors before submitting.");
    return;
  }

  const fd = new FormData();
  fd.append("company_id", form.company_id);
  fd.append("email", form.email);
  fd.append("mobile", form.mobile);
  fd.append("landline", form.landline);
  fd.append("category", form.category);
  fd.append("subcategory", form.subcategory);
  fd.append("discount", form.discount);
  fd.append("comments", form.comments);
  if (file) fd.append("contract", file);

  const languageProperties = {};
  for (const [langCode, langData] of Object.entries(form.languages)) {
    languageProperties[langCode.toUpperCase()] = {
      company_name: langData.company || "",
      description: langData.desc || "",
      address: langData.address || "",
      owner_name: langData.owner || "",
    };
  }

  fd.append("properties", JSON.stringify(languageProperties));

  try {
    const base = import.meta.env.VITE_API_URL || "";
    const url = id ? `${base}/api/companies/${id}` : `${base}/api/companies`;
    const method = id ? "PUT" : "POST";

    console.log("🚀 Sending request to:", url);
    console.log("📦 Method:", method);
    console.log("📬 FormData:");
    for (let [key, val] of fd.entries()) console.log(`   ${key}:`, val);

    const res = await fetch(url, { method, body: fd });
    console.log("📩 Response status:", res.status);

    let responseText = await res.text(); // safer parsing
    let response = {};
    try {
      response = JSON.parse(responseText);
    } catch {
      response = { raw: responseText };
    }

    console.log("📨 Response body:", response);

    if (!res.ok) {
      const errorMsg = response.error || "Unknown error";
      if (errorMsg.includes("Company ID")) {
        setErrors((prev) => ({ ...prev, company_id: errorMsg }));
      } else if (errorMsg.includes("Company name")) {
        setErrors((prev) => ({ ...prev, company_name: errorMsg }));
      }
      alert(`❌ ${errorMsg}`);
      return;
    }

    alert(id ? "✅ Company updated successfully!" : "✅ Company created successfully!");
    navigate("/company-profile");

  } catch (err) {
    console.error("❌ Network or code error:", err);
    alert("❌ Failed to save company: " + err.message);
  }
};


  const langKey = activeLang.toUpperCase();

  return (
    <div className="register-container">
      <header className="banner" dir={activeLang === "ar" ? "rtl" : "ltr"}>
        <h1>
          {id
            ? messages[activeLang]?.labels?.heading_edit ||
              messages.en.labels.heading_edit
            : messages[activeLang]?.labels?.heading_create ||
              messages.en.labels.heading_create}
        </h1>
      </header>

      <main className="form-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
        {/* <h2>
          {messages[activeLang]?.labels?.company_info ||
            messages.en.labels.company_info}
        </h2> */}

        <form onSubmit={handleSubmit} autoComplete="off">
        {/* Language Tabs */}
        
<div className="lang-tabs">
  {[...BASE_LANGS, ...extraLangs].map((lang) => {
    const lower = lang.toLowerCase();
    const label =
      messages[lower]?.labels?.language_name ||
      messages[lower]?.labels?.welcome ||
      lang.toUpperCase();

    return (
      <button
        key={lang}
        className={`lang-btn ${activeLang === lang ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setActiveLang(lang);
          const upper = lang.toUpperCase();
          setForm((prev) => ({
            ...prev,
            [`company${upper}`]: prev[`company${upper}`] || "",
            [`desc${upper}`]: prev[`desc${upper}`] || "",
            [`address${upper}`]: prev[`address${upper}`] || "",
            [`owner${upper}`]: prev[`owner${upper}`] || "",
          }));
        }}
      >
        {label}
      </button>
    );
  })}
</div>


          {/* Dynamic Fields */}
<div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <h3>
    {messages[activeLang]?.labels?.welcome || messages.en.labels.welcome}
  </h3>

{["company", "desc", "address", "owner"].map((field) => (
  <div className="field" key={field}>
    <label>
      {messages[activeLang]?.labels?.[field === "desc" ? "description" : field] ||
        messages.en.labels[field === "desc" ? "description" : field]}
      <span className="required">*</span>
    </label>

    {field === "desc" || field === "address" ? (
      <textarea
        name={field}
        rows="3"
        value={form.languages?.[activeLang]?.[field] || ""}
        onChange={(e) => handleChange(e, activeLang)}
      />
    ) : (
      <input
        name={field}
        value={form.languages?.[activeLang]?.[field] || ""}
        onChange={(e) => handleChange(e, activeLang)}
      />
    )}
     {/* ✅ Show company_name error right under the company field */}
      {field === "company" && errors.company_name && (
        <p className="error">{errors.company_name}</p>
      )}
  </div>
))}

</div>

{/* 🌍 Global Fields Section */}
{/* 🆔 Company ID (Manual Entry) */}
<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.company_id || "Company ID"}
      <span className="required">*</span>
    </label>
    <input
      type="text"
      name="company_id"
     // placeholder="e.g., CMP001"
      value={form.company_id || ""}
      onChange={handleChange}
    />
    {errors.company_id && <p className="error">{errors.company_id}</p>}
  </div>
</div>

<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.email || messages.en.labels.email}
      <span className="required">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
    />
    {errors.email && <p className="error">{errors.email}</p>}
  </div>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.mobile || messages.en.labels.mobile}
      <span className="required">*</span>
    </label>
    <input
      type="tel"
      name="mobile"
      value={form.mobile}
      onChange={handleChange}
    />
    {errors.mobile && <p className="error">{errors.mobile}</p>}
  </div>
</div>

<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.landline || messages.en.labels.landline}
    </label>
    <input
      type="tel"
      name="landline"
      value={form.landline}
      onChange={handleChange}
    />
  </div>
</div>

<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.category || messages.en.labels.category}
      <span className="required">*</span>
    </label>
    <select name="category" value={form.category} onChange={handleChange}>
      <option value="">
        {messages[activeLang]?.dropdowns?.select || "--Select--"}
      </option>
      {messages[activeLang]?.dropdowns?.categories?.map((cat, i) => (
        <option key={i} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    {errors.category && <p className="error">{errors.category}</p>}
  </div>

  <div className="col">
    <label>
      {messages[activeLang]?.labels?.subcategory ||
        messages.en.labels.subcategory}
        <span className="required">*</span>
    </label>
    <select
      name="subcategory"
      value={form.subcategory}
      onChange={handleChange}
    >
      <option value="">
        {messages[activeLang]?.dropdowns?.select || "--Select--"}
      </option>
      {messages[activeLang]?.dropdowns?.subcategories?.map((sub, i) => (
        <option key={i} value={sub}>
          {sub}
        </option>
      ))}
    </select>
    {errors.subcategory && <p className="error">{errors.subcategory}</p>}
  </div>
</div>

<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.discount || messages.en.labels.discount}
      <span className="required">*</span>
    </label>
    <input name="discount" value={form.discount} onChange={handleChange} />
    {errors.discount && <p className="error">{errors.discount}</p>}
  </div>
</div>

<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.comments || messages.en.labels.comments}
    </label>
    <textarea
      name="comments"
      rows="3"
      value={form.comments}
      onChange={handleChange}
    />
  </div>
</div>

{/* 📁 File Upload */}
<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col file-upload">
    <label htmlFor="contract" className="custom-file-label">
      📤 {messages[activeLang]?.labels?.contract || messages.en.labels.contract}
    </label>
    <input
      id="contract"
      type="file"
      name="contract"
      accept=".pdf,.png,.jpg,.jpeg"
      onChange={(e) => setFile(e.target.files[0])}
      style={{ display: "none" }}
    />
    <span className="file-name">
      {file
        ? file.name
        : messages[activeLang]?.labels?.no_file || "No file chosen"}
    </span>
  </div>
</div>

{/* 📜 Terms & Conditions */}
<div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col terms">
    <label className="terms-label">
      <div
        className={`toggle-switch ${form.agree ? "on" : ""}`}
        onClick={() => setForm((prev) => ({ ...prev, agree: !prev.agree }))}
      >
        <div className="toggle-slider"></div>
      </div>
      <span>
        {messages[activeLang]?.labels?.agree_prefix ||
          messages.en.labels.agree_prefix}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowTerms(true);
          }}
        >
          {messages[activeLang]?.labels?.terms || messages.en.labels.terms}
        </a>
      </span>
    </label>
    {errors.agree && <p className="error">{errors.agree}</p>}
  </div>
</div>

<TermsModal
  open={showTerms}
  onClose={() => setShowTerms(false)}
  activeLang={activeLang}
/>

{/* Buttons */}
<div className="button-group" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <button
    type="button"
    className="btn cancel"
    onClick={() => navigate("/company-profile")}
  >
    {messages[activeLang]?.labels?.cancel || messages.en.labels.cancel}
  </button>
  <button type="submit" className="btn submit">
    {id
      ? messages[activeLang]?.labels?.update || messages.en.labels.update
      : messages[activeLang]?.labels?.approve || messages.en.labels.approve}
  </button>
</div>

</form>
</main>

<footer className="footer">© 2025 Comviva. All rights reserved.</footer>
</div>);
  
  }