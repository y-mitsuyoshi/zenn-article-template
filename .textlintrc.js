module.exports = {
  filters: {
    comments: true,
  },
  rules: {
    // 日本語技術文書向けのプリセット
    'preset-ja-technical-writing': {
      // 1文の長さ制限（デフォルトは100文字）
      'sentence-length': {
        max: 150,
      },
      // 「ですます調」と「である調」の混在チェック
      'no-mix-dearu-desumasu': {
        preferInHeader: '',
        preferInBody: 'ですます',
        preferInList: 'である',
        strict: false,
      },
      // 二重否定の検出
      'no-double-negative-ja': true,
      // 冗長な表現の検出
      'ja-no-redundant-expression': true,
      // 同じ接続詞の連続使用を検出
      'max-ten': {
        max: 3,
      },
      // カタカナ語の長音省略（サーバ vs サーバー）の統一
      'no-dropping-the-ra': true,
    },
    // 日本語のスペーシングルール
    'preset-ja-spacing': {
      // カッコの前後のスペース
      'ja-space-around-code': {
        before: true,
        after: true,
      },
    },
  },
};
