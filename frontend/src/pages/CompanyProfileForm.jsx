

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
      heading_create: "कंपनी पंजीकरण पोर्टल में आपका स्वागत है",
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

  // Bengali (bn)
be: {
  labels: {
    company: "কোম্পানির নাম",
    heading_create: "কোম্পানির প্রোফাইল তৈরি করুন",
    heading_edit: "কোম্পানির প্রোফাইল সম্পাদনা করুন",
    company_info: "কোম্পানির তথ্য",
    welcome: "স্বাগতম",
    language_name: "বাংলা",
    company_id: "কোম্পানি আইডি",
    company_name: "কোম্পানির নাম",
    description: "বিবরণ",
    address: "ঠিকানা",
    owner: "মালিক",
    email: "ইমেইল",
    mobile: "মোবাইল",
    landline: "ল্যান্ডলাইন",
    category: "বিভাগ",
    subcategory: "উপবিভাগ",
    discount: "ছাড় (%)",
    comments: "মন্তব্য",
    contract: "চুক্তি আপলোড করুন",
    agree_prefix: "আমি সম্মত",
    terms: "শর্তাবলী",
    cancel: "বাতিল",
    approve: "অনুমোদন",
    update: "আপডেট",
  },
  dropdowns: {
    select: "--নির্বাচন করুন--",
    categories: ["হোটেল", "খুচরা বিক্রেতা"],
    subcategories: ["স্বাস্থ্য", "মুদিখানা", "ফ্যাশন"],
  },
  errors: {
    company_id: "কোম্পানি আইডি প্রয়োজন",
    company_name: "কোম্পানির নাম প্রয়োজন",
    description: "বিবরণ প্রয়োজন",
    address: "ঠিকানা প্রয়োজন",
    owner: "মালিক প্রয়োজন",
    email: "বৈধ ইমেইল প্রয়োজন",
    mobile: "মোবাইল ৮–১৫ সংখ্যা হতে হবে",
    discount_required: "ছাড় প্রয়োজন",
    discount_format: "সর্বোচ্চ ২-অঙ্কের সংখ্যা",
    category: "বিভাগ নির্বাচন করুন",
    subcategory: "উপবিভাগ নির্বাচন করুন",
    agree: "আপনাকে শর্তাবলীতে সম্মত হতে হবে",
  },
  terms: {
    title: "শর্তাবলী",
    intro: "এই শর্তাবলী এই পরিষেবা ব্যবহারের নিয়মগুলি নির্ধারণ করে। ফর্ম জমা দিয়ে আপনি এই শর্তগুলির সাথে সম্মত হচ্ছেন।",
    points: [
      "সঠিক কোম্পানির তথ্য প্রদান করুন।",
      "নিশ্চিত করুন যে আপলোড করা চুক্তি বৈধ।",
      "গোপনীয়তা এবং ডেটা প্রক্রিয়াকরণের নিয়ম মেনে চলুন।",
    ],
    outro: "যদি আপনি এই শর্তগুলির সাথে একমত না হন, তবে আপনি নিবন্ধন চালিয়ে যেতে পারবেন না।",
  },
},

// Urdu (ur)
ur: {
  labels: {
    company: "کمپنی کا نام",
    heading_create: "کمپنی پروفائل بنائیں",
    heading_edit: "کمپنی پروفائل میں ترمیم کریں",
    company_info: "کمپنی کی معلومات",
    welcome: "خوش آمدید",
    language_name: "اردو",
    company_id: "کمپنی آئی ڈی",
    company_name: "کمپنی کا نام",
    description: "تفصیل",
    address: "پتہ",
    owner: "مالک",
    email: "ای میل",
    mobile: "موبائل",
    landline: "لینڈ لائن",
    category: "زمرہ",
    subcategory: "ذیلی زمرہ",
    discount: "چھوٹ (%)",
    comments: "تبصرے",
    contract: "معاہدہ اپ لوڈ کریں",
    agree_prefix: "میں اتفاق کرتا ہوں",
    terms: "شرائط و ضوابط",
    cancel: "منسوخ کریں",
    approve: "منظور کریں",
    update: "اپ ڈیٹ کریں",
  },
  dropdowns: {
    select: "--منتخب کریں--",
    categories: ["ہوٹل", "تھوک فروش"],
    subcategories: ["صحت", "کریانہ", "فیشن"],
  },
  errors: {
    company_id: "کمپنی آئی ڈی درکار ہے",
    company_name: "کمپنی کا نام درکار ہے",
    description: "تفصیل درکار ہے",
    address: "پتہ درکار ہے",
    owner: "مالک درکار ہے",
    email: "درست ای میل ضروری ہے",
    mobile: "موبائل 8–15 ہندسوں کا ہونا چاہیے",
    discount_required: "چھوٹ درکار ہے",
    discount_format: "زیادہ سے زیادہ دو ہندسوں کی تعداد",
    category: "زمرہ منتخب کریں",
    subcategory: "ذیلی زمرہ منتخب کریں",
    agree: "آپ کو شرائط سے اتفاق کرنا ہوگا",
  },
  terms: {
    title: "شرائط و ضوابط",
    intro: "یہ شرائط اور ضوابط اس سروس کے استعمال کے اصول بیان کرتی ہیں۔ فارم جمع کر کے آپ ان شرائط سے اتفاق کرتے ہیں۔",
    points: [
      "درست کمپنی کی تفصیلات فراہم کریں۔",
      "یقینی بنائیں کہ اپ لوڈ کردہ معاہدہ درست ہے۔",
      "رازداری اور ڈیٹا پروسیسنگ کے اصولوں کا احترام کریں۔",
    ],
    outro: "اگر آپ ان شرائط سے اتفاق نہیں کرتے تو آپ رجسٹریشن جاری نہیں رکھ سکتے۔",
  },
},

// Indonesian (id)
in: {
  labels: {
    company: "Nama Perusahaan",
    heading_create: "Buat Profil Perusahaan",
    heading_edit: "Edit Profil Perusahaan",
    company_info: "Informasi Perusahaan",
    welcome: "Selamat datang",
    language_name: "Bahasa Indonesia",
    company_id: "ID Perusahaan",
    company_name: "Nama Perusahaan",
    description: "Deskripsi",
    address: "Alamat",
    owner: "Pemilik",
    email: "Email",
    mobile: "Ponsel",
    landline: "Telepon Rumah",
    category: "Kategori",
    subcategory: "Subkategori",
    discount: "Diskon (%)",
    comments: "Komentar",
    contract: "Unggah Kontrak",
    agree_prefix: "Saya setuju dengan",
    terms: "Syarat dan Ketentuan",
    cancel: "Batal",
    approve: "Setuju",
    update: "Perbarui",
  },
  dropdowns: {
    select: "--Pilih--",
    categories: ["Hotel", "Ritel"],
    subcategories: ["Kesehatan", "Grosir", "Fashion"],
  },
  errors: {
    company_id: "ID Perusahaan wajib diisi",
    company_name: "Nama Perusahaan wajib diisi",
    description: "Deskripsi wajib diisi",
    address: "Alamat wajib diisi",
    owner: "Pemilik wajib diisi",
    email: "Email yang valid diperlukan",
    mobile: "Nomor ponsel harus 8–15 digit",
    discount_required: "Diskon wajib diisi",
    discount_format: "Maksimal 2 digit",
    category: "Pilih kategori",
    subcategory: "Pilih subkategori",
    agree: "Anda harus menyetujui syarat dan ketentuan",
  },
  terms: {
    title: "Syarat dan Ketentuan",
    intro: "Syarat dan ketentuan ini menjelaskan aturan penggunaan layanan ini. Dengan mengirimkan formulir ini, Anda setuju untuk mematuhi aturan ini.",
    points: [
      "Berikan informasi perusahaan yang akurat.",
      "Pastikan kontrak yang diunggah valid.",
      "Hormati kebijakan privasi dan pemrosesan data.",
    ],
    outro: "Jika Anda tidak setuju dengan syarat ini, Anda tidak dapat melanjutkan pendaftaran perusahaan.",
  },
},

// Swahili (sw)
sw: {
  labels: {
    company: "Jina la Kampuni",
    heading_create: "Unda Profaili ya Kampuni",
    heading_edit: "Hariri Profaili ya Kampuni",
    company_info: "Taarifa za Kampuni",
    welcome: "Karibu",
    language_name: "Kiswahili",
    company_id: "Kitambulisho cha Kampuni",
    company_name: "Jina la Kampuni",
    description: "Maelezo",
    address: "Anwani",
    owner: "Mmiliki",
    email: "Barua pepe",
    mobile: "Simu ya mkononi",
    landline: "Simu ya mezani",
    category: "Aina",
    subcategory: "Aina Ndogo",
    discount: "Punguzo (%)",
    comments: "Maoni",
    contract: "Pakia Mkataba",
    agree_prefix: "Nakubali",
    terms: "Sheria na Masharti",
    cancel: "Ghairi",
    approve: "Kubali",
    update: "Sasisha",
  },
  dropdowns: {
    select: "--Chagua--",
    categories: ["Hoteli", "Uuzaji wa rejareja"],
    subcategories: ["Afya", "Vyakula", "Mitindo"],
  },
  errors: {
    company_id: "Kitambulisho cha kampuni kinahitajika",
    company_name: "Jina la kampuni linahitajika",
    description: "Maelezo yanahitajika",
    address: "Anwani inahitajika",
    owner: "Mmiliki anahitajika",
    email: "Barua pepe sahihi inahitajika",
    mobile: "Nambari ya simu lazima iwe na tarakimu 8–15",
    discount_required: "Punguzo linahitajika",
    discount_format: "Tarakimu zisizozidi 2",
    category: "Chagua aina",
    subcategory: "Chagua aina ndogo",
    agree: "Lazima ukubaliane na masharti",
  },
  terms: {
    title: "Sheria na Masharti",
    intro: "Masharti haya yanaeleza kanuni za kutumia huduma hii. Kwa kutuma fomu hii, unakubali masharti haya.",
    points: [
      "Toa taarifa sahihi za kampuni.",
      "Hakikisha mikataba iliyopakiwa ni halali.",
      "Heshimu sera za faragha na usindikaji wa data.",
    ],
    outro: "Kama hukubaliani na masharti haya, huwezi kuendelea na usajili wa kampuni.",
  },
},

// Turkish (tr)
tu: {
  labels: {
    company: "Şirket Adı",
    heading_create: "Şirket Profili Oluştur",
    heading_edit: "Şirket Profilini Düzenle",
    company_info: "Şirket Bilgileri",
    welcome: "Hoşgeldiniz",
    language_name: "Türkçe",
    company_id: "Şirket Kimliği",
    company_name: "Şirket Adı",
    description: "Açıklama",
    address: "Adres",
    owner: "Sahip",
    email: "E-posta",
    mobile: "Cep Telefonu",
    landline: "Sabit Hat",
    category: "Kategori",
    subcategory: "Alt Kategori",
    discount: "İndirim (%)",
    comments: "Yorumlar",
    contract: "Sözleşme Yükle",
    agree_prefix: "Kabul ediyorum",
    terms: "Şartlar ve Koşullar",
    cancel: "İptal",
    approve: "Onayla",
    update: "Güncelle",
  },
  dropdowns: {
    select: "--Seçin--",
    categories: ["Otel", "Perakende"],
    subcategories: ["Sağlık", "Market", "Moda"],
  },
  errors: {
    company_id: "Şirket kimliği gerekli",
    company_name: "Şirket adı gerekli",
    description: "Açıklama gerekli",
    address: "Adres gerekli",
    owner: "Sahip gerekli",
    email: "Geçerli bir e-posta gerekli",
    mobile: "Telefon numarası 8–15 haneli olmalıdır",
    discount_required: "İndirim gerekli",
    discount_format: "Maksimum 2 basamaklı sayı",
    category: "Kategori seçin",
    subcategory: "Alt kategori seçin",
    agree: "Şartları kabul etmelisiniz",
  },
  terms: {
    title: "Şartlar ve Koşullar",
    intro: "Bu şartlar hizmetin kullanım kurallarını açıklar. Bu formu göndererek şartları kabul etmiş olursunuz.",
    points: [
      "Doğru şirket bilgilerini sağlayın.",
      "Yüklenen sözleşmelerin geçerli olduğundan emin olun.",
      "Gizlilik ve veri işleme kurallarına uyun.",
    ],
    outro: "Bu şartları kabul etmiyorsanız, kayıt işlemine devam edemezsiniz.",
  },
},

// Korean (ko)
ko: {
  labels: {
    company: "회사 이름",
    heading_create: "회사 프로필 생성",
    heading_edit: "회사 프로필 편집",
    company_info: "회사 정보",
    welcome: "환영합니다",
    language_name: "한국어",
    company_id: "회사 ID",
    company_name: "회사 이름",
    description: "설명",
    address: "주소",
    owner: "소유자",
    email: "이메일",
    mobile: "휴대전화",
    landline: "유선전화",
    category: "카테고리",
    subcategory: "하위 카테고리",
    discount: "할인 (%)",
    comments: "댓글",
    contract: "계약서 업로드",
    agree_prefix: "동의합니다",
    terms: "이용 약관",
    cancel: "취소",
    approve: "승인",
    update: "업데이트",
  },
  dropdowns: {
    select: "--선택--",
    categories: ["호텔", "소매업"],
    subcategories: ["건강", "식료품", "패션"],
  },
  errors: {
    company_id: "회사 ID가 필요합니다",
    company_name: "회사 이름이 필요합니다",
    description: "설명이 필요합니다",
    address: "주소가 필요합니다",
    owner: "소유자가 필요합니다",
    email: "유효한 이메일이 필요합니다",
    mobile: "전화번호는 8–15자리여야 합니다",
    discount_required: "할인이 필요합니다",
    discount_format: "최대 2자리 숫자",
    category: "카테고리를 선택하세요",
    subcategory: "하위 카테고리를 선택하세요",
    agree: "약관에 동의해야 합니다",
  },
  terms: {
    title: "이용 약관",
    intro: "이 약관은 서비스 사용 규칙을 설명합니다. 양식을 제출함으로써 이 조건에 동의하는 것으로 간주됩니다.",
    points: [
      "정확한 회사 정보를 제공하세요.",
      "업로드된 계약이 유효한지 확인하세요.",
      "개인정보 보호 및 데이터 처리 규칙을 준수하세요.",
    ],
    outro: "이 조건에 동의하지 않으면 회사 등록을 계속할 수 없습니다.",
  },
},

// Italian (it)
it: {
  labels: {
    company: "Nome dell'azienda",
    heading_create: "Crea profilo aziendale",
    heading_edit: "Modifica profilo aziendale",
    company_info: "Informazioni sull'azienda",
    welcome: "Benvenuto",
    language_name: "Italiano",
    company_id: "ID azienda",
    company_name: "Nome dell'azienda",
    description: "Descrizione",
    address: "Indirizzo",
    owner: "Proprietario",
    email: "Email",
    mobile: "Cellulare",
    landline: "Telefono fisso",
    category: "Categoria",
    subcategory: "Sottocategoria",
    discount: "Sconto (%)",
    comments: "Commenti",
    contract: "Carica contratto",
    agree_prefix: "Accetto",
    terms: "Termini e condizioni",
    cancel: "Annulla",
    approve: "Approva",
    update: "Aggiorna",
  },
  dropdowns: {
    select: "--Seleziona--",
    categories: ["Hotel", "Vendita al dettaglio"],
    subcategories: ["Salute", "Alimentari", "Moda"],
  },
  errors: {
    company_id: "ID azienda obbligatorio",
    company_name: "Nome azienda obbligatorio",
    description: "Descrizione obbligatoria",
    address: "Indirizzo obbligatorio",
    owner: "Proprietario obbligatorio",
    email: "Email valida obbligatoria",
    mobile: "Il numero deve avere tra 8 e 15 cifre",
    discount_required: "Sconto obbligatorio",
    discount_format: "Numero massimo di 2 cifre",
    category: "Seleziona una categoria",
    subcategory: "Seleziona una sottocategoria",
    agree: "Devi accettare i termini",
  },
  terms: {
    title: "Termini e condizioni",
    intro: "Questi termini descrivono le regole per l'utilizzo del servizio. Inviando questo modulo accetti tali condizioni.",
    points: [
      "Fornisci informazioni aziendali accurate.",
      "Assicurati che i contratti caricati siano validi.",
      "Rispetta le norme sulla privacy e sul trattamento dei dati.",
    ],
    outro: "Se non accetti questi termini, non puoi continuare la registrazione dell'azienda.",
  },
},

};



export default function CompanyProfileForm() {
   const BASE_LANGS = ["en", "ar"];
  const [extraLangs, setExtraLangs] = useState([]); 
  const [activeLang, setActiveLang] = useState("en");
  const [form, setForm] = useState({
  company_id: "",
  languages: {
    en: { company: "", desc: "", address: "", owner: "" },
  //  fr: { company: "", desc: "", address: "", owner: "" },
    ar: { company: "", desc: "", address: "", owner: "" },
  },
  email: "",
  mobile: "",
  landline: "",
  category: "",
  subcategory: "",
  //discount: "",
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
       // discount: c.discount || "",
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
// const validate = (f) => {
//   const e = {};
//   const t = messages[activeLang]?.errors || messages.en.errors;

//   // 🔹 Helper function
//   const has = (val) => val && val.trim() !== "";

//   // 🌍 Global fields
//   if (!has(f.company_id)) e.company_id = t.company_id;

//   // ✅ Company Name – required in at least one language
//   const hasCompany = Object.values(f.languages || {}).some(
//     (lang) => lang.company && lang.company.trim() !== ""
//   );
//   if (!hasCompany)
//    e.company = t.company_name || messages.en.errors.company_name;

//   // ✅ Description – required in at least one language
//   const hasDesc = Object.values(f.languages || {}).some(
//     (lang) => lang.desc && lang.desc.trim() !== ""
//   );
//   if (!hasDesc)
//    e.description = t.description || messages.en.errors.description;

//   // ✅ Address – required in at least one language
//   const hasAddress = Object.values(f.languages || {}).some(
//     (lang) => lang.address && lang.address.trim() !== ""
//   );
//   if (!hasAddress)
//    e.address = t.address || messages.en.errors.address;

//   // ✅ Owner – required in at least one language
//   const hasOwner = Object.values(f.languages || {}).some(
//     (lang) => lang.owner && lang.owner.trim() !== ""
//   );
//   if (!hasOwner)
//    e.owner = t.owner || messages.en.errors.owner;

//   // ✉️ Email validation
//   const emailRx = /\S+@\S+\.\S+/;
//   if (!emailRx.test(f.email)) e.email = t.email || "Enter a valid email.";

//   // 📞 Mobile validation (+, - and numbers only)
//   if (!/^[0-9+-]{6,15}$/.test(String(f.mobile || "")))
//     e.mobile = t.mobile || "Enter a valid mobile number.";

//   // 💸 Discount validation
//   if (!has(f.discount)) e.discount = t.discount_required || "Discount is required.";
//   else if (!/^\d{1,2}(\.\d{1,2})?$/.test(f.discount))
//     e.discount = t.discount_format || "Invalid discount format.";

//   // 📂 Dropdowns
//   if (!f.category) e.category = t.category || "Category is required.";
//   if (!f.subcategory) e.subcategory = t.subcategory || "Subcategory is required.";

//   // ✅ Terms & Conditions
//   if (!f.agree) e.agree = t.agree || "You must agree to continue.";

//   return e;
// };

// const validate = (f) => {
//  const e = {};
//  const t = messages[activeLang]?.errors || messages.en.errors;
 
//  // Helper function to check if a value exists and is not empty
//  const has = (val) => val && val.trim() !== "";
 
//  // 🔹 Validate Company ID (global field)
//  if (!has(f.company_id)) {
//  e.company_id = t.company_id;
//  }
 
//  // 🔹 Validate Email (global field)
//  if (!has(f.email) || !emailRx.test(f.email)) {
//  e.email = t.email;
//  }
 
//  // 🔹 Validate Mobile (global field)
//  if (!has(f.mobile) || !/^[0-9+\-\s()]{8,15}$/.test(String(f.mobile).replace(/\s/g, ''))) {
//  e.mobile = t.mobile;
//  }
 
//  // 🔹 Validate Discount (global field)
// //  if (!has(f.discount)) {
// //  e.discount = t.discount_required;
// //  } else if (!/^\d{1,2}(\.\d{1,2})?$/.test(f.discount)) {
// //  e.discount = t.discount_format;
// //  }
 
//  // 🔹 Validate Category & Subcategory (global fields)
//  if (!f.category || f.category === "") {
//  e.category = t.category;
//  }
 
//  if (!f.subcategory || f.subcategory === "") {
//  e.subcategory = t.subcategory;
//  }
 
//  // 🔹 Validate Terms Agreement (global field)
//  if (!f.agree) {
//  e.agree = t.agree;
//  }
 
//  // 🌍 MULTILINGUAL VALIDATION - Check if required fields exist in at least one language
//  const availableLangs = Object.keys(f.languages || {});
 
//  // Company Name - must exist in at least one language
//  const hasCompanyInAnyLang = availableLangs.some(lang => 
//  has(f.languages[lang]?.company)
//  );
//  if (!hasCompanyInAnyLang) {
//  e.company = t.company_name || "Company name is required in at least one language";
//  }
 
//  // Description - must exist in at least one language
//  const hasDescInAnyLang = availableLangs.some(lang => 
//  has(f.languages[lang]?.desc)
//  );
//  if (!hasDescInAnyLang) {
//  e.description = t.description || "Description is required in at least one language";
//  }
 
//  // Address - must exist in at least one language
//  const hasAddressInAnyLang = availableLangs.some(lang => 
//  has(f.languages[lang]?.address)
//  );
//  if (!hasAddressInAnyLang) {
//  e.address = t.address || "Address is required in at least one language";
//  }
 
//  // Owner - must exist in at least one language
//  const hasOwnerInAnyLang = availableLangs.some(lang => 
//  has(f.languages[lang]?.owner)
//  );
//  if (!hasOwnerInAnyLang) {
//  e.owner = t.owner || "Owner is required in at least one language";
//  }
 
//  return e;
// };


const validate = (f, file) => {
  const e = {};
  const t = messages[activeLang]?.errors || messages.en.errors;

  // ✅ Helper function to check if a value exists and is not empty
  const has = (val) => val && val.trim() !== "";

  // 🔹 Validate Company ID (global field)
  if (!has(f.company_id)) {
    e.company_id = t.company_id || "Company ID is required";
  }

  // 🔹 Validate Email (global field)
  if (!has(f.email) || !emailRx.test(f.email)) {
    e.email = t.email || "Valid email is required";
  }

  // 🔹 Validate Mobile (global field)
  if (
    !has(f.mobile) ||
    !/^[0-9+\-\s()]{8,15}$/.test(String(f.mobile).replace(/\s/g, ""))
  ) {
    e.mobile = t.mobile || "Valid mobile number is required";
  }

  // 🔹 Validate Category & Subcategory (global fields)
  if (!f.category || f.category === "") {
    e.category = t.category || "Category is required";
  }

  if (!f.subcategory || f.subcategory === "") {
    e.subcategory = t.subcategory || "Subcategory is required";
  }

  // 🔹 Validate Terms Agreement (global field)
  if (!f.agree) {
    e.agree = t.agree || "You must agree to continue";
  }

  // 🔹 Validate File Upload (if present)
  if (file) {
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      e.contract = "Only PDF, PNG, JPG, or JPEG files are supported";
    }
    if (file.size > 5 * 1024 * 1024) {
      e.contract = "File size must be 5MB or less";
    }
  }

  // 🌍 MULTILINGUAL VALIDATION - Check if required fields exist in at least one language
  const availableLangs = Object.keys(f.languages || {});

  // Company Name - must exist in at least one language
  const hasCompanyInAnyLang = availableLangs.some((lang) =>
    has(f.languages[lang]?.company)
  );
  if (!hasCompanyInAnyLang) {
    e.company =
      t.company_name || "Company name is required in at least one language";
  }

  // Description - must exist in at least one language
  const hasDescInAnyLang = availableLangs.some((lang) =>
    has(f.languages[lang]?.desc)
  );
  if (!hasDescInAnyLang) {
    e.description =
      t.description || "Description is required in at least one language";
  }

  // Address - must exist in at least one language
  const hasAddressInAnyLang = availableLangs.some((lang) =>
    has(f.languages[lang]?.address)
  );
  if (!hasAddressInAnyLang) {
    e.address =
      t.address || "Address is required in at least one language";
  }

  // Owner - must exist in at least one language
  const hasOwnerInAnyLang = availableLangs.some((lang) =>
    has(f.languages[lang]?.owner)
  );
  if (!hasOwnerInAnyLang) {
    e.owner = t.owner || "Owner is required in at least one language";
  }

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
 // 🔤 language-specific field
 const updatedLanguages = {
 ...prev.languages,
 [lang]: {
 ...prev.languages[lang],
 [name]: val,
 },
 };
 return {
 ...prev,
 languages: updatedLanguages,
 };
 } else {
 // 🌍 global field
 return { ...prev, [name]: val };
 }
 });
 
 // 🧹 Clear validation errors dynamically
 setErrors((prev) => {
 const newErrors = { ...prev };
 
 if (lang) {
 // 🈯 Language-specific field - check if we now have valid data across all languages
 const updatedForm = {
 ...form,
 languages: {
 ...form.languages,
 [lang]: {
 ...form.languages[lang],
 [name]: val,
 },
 },
 };
 
 // Clear errors if field now exists in at least one language
 const fieldMapping = {
 company: 'company',
 desc: 'description', 
 address: 'address',
 owner: 'owner'
 };
 
 const errorKey = fieldMapping[name];
 if (errorKey && val && val.trim() !== "") {
 // Check if this field now has valid data in at least one language
 const hasValidInAnyLang = Object.values(updatedForm.languages || {}).some(
 langData => langData[name] && langData[name].trim() !== ""
 );
 if (hasValidInAnyLang) {
 delete newErrors[errorKey];
 }
 }
 } else {
 // 🌍 Global field validation clearing
 if (name === "company_id" && val && val.trim() !== "") {
 delete newErrors.company_id;
 }
 if (name === "email" && val && emailRx.test(val)) {
 delete newErrors.email;
 }
 if (name === "mobile" && val && /^[0-9+\-\s()]{8,15}$/.test(String(val).replace(/\s/g, ''))) {
 delete newErrors.mobile;
 }
 if (name === "discount" && val && /^\d{1,2}(\.\d{1,2})?$/.test(val)) {
 delete newErrors.discount;
 }
 if (name === "category" && val && val !== "") {
 delete newErrors.category;
 }
 if (name === "subcategory" && val && val !== "") {
 delete newErrors.subcategory;
 }
 if (name === "agree" && val === true) {
 delete newErrors.agree;
 }
 }
 
 return newErrors;
 });
};

// const handleChange = (e, lang = null) => {
//   const { name, value, type, checked } = e.target;
//   const val = type === "checkbox" ? checked : value;

//   // 🟢 Update state
//   setForm((prev) => {
//     if (lang) {
//       // 🔤 language-specific field (e.g., company_name, desc, address)
//       return {
//         ...prev,
//         languages: {
//           ...prev.languages,
//           [lang]: {
//             ...prev.languages[lang],
//             [name]: val,
//           },
//         },
//       };
//     } else {
//       // 🌍 global field
//       return { ...prev, [name]: val };
//     }
//   });

//   // 🧹 Clear validation dynamically as soon as valid value is entered
//   setErrors((prev) => {
//     const newErrors = { ...prev };

//     // 🌍 Global field validations
//     if (!lang) {
//       // ✅ Remove generic "required" error when non-empty
//       if (val && val.trim() !== "") delete newErrors[name];

//       // ✅ Specific field validations
//       if (name === "email" && /\S+@\S+\.\S+/.test(val)) delete newErrors[name];
//       if (name === "mobile" && /^\d{6,15}$/.test(val)) delete newErrors[name];
//       if (name === "discount" && /^\d+(\.\d{1,2})?$/.test(val))
//         delete newErrors[name];
//       if (
//         (name === "category" || name === "subcategory") &&
//         val.trim() !== ""
//       )
//         delete newErrors[name];
//       if (name === "company_id" && val.trim() !== "") delete newErrors[name];
//       if (name === "comments" && val.trim() !== "") delete newErrors[name];
//     }

//     // 🈯 Language-specific field validations
//     if (lang) {
//       const langErrors = { ...(newErrors[lang] || {}) };

//       // Remove required/empty error when text is entered
//       if (val && val.trim() !== "") delete langErrors[name];

//       // If nested language errors exist, update them
//       if (Object.keys(langErrors).length > 0) {
//         newErrors[lang] = langErrors;
//       } else {
//         delete newErrors[lang];
//       }
//     }

//     return newErrors;
//   });
// };

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
  //fd.append("discount", form.discount);
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

      {errors[field === "desc" ? "description" : field] && (
        <p className="error">
          {errors[field === "desc" ? "description" : field]}
        </p>
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

{/* <div className="row" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <div className="col">
    <label>
      {messages[activeLang]?.labels?.discount || messages.en.labels.discount}
      <span className="required">*</span>
    </label>
    <input name="discount" value={form.discount} onChange={handleChange} />
    {errors.discount && <p className="error">{errors.discount}</p>}
  </div>
</div> */}

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
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("❌ Unsupported file format. Please upload PDF, PNG, JPG, or JPEG.");
        e.target.value = ""; 
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { 
        alert("❌ File is too large. Max size is 5MB.");
        e.target.value = "";
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  }}
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
   messages={messages} 
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