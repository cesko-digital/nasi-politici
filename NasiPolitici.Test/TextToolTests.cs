using HlidacStatu.NasiPolitici;
using Xunit;

namespace NasiPolitici.Test
{
    public class TextToolTests
    {
        [Fact]
        public void AlwaysTrue()
        {
            Assert.True(true);
        }

        [Fact]
        public void CorrectlyRemoveAccents()
        {
            string text = @"ĚŘŤŽŠĎČŇěřťžšďčň-éúíóáý-ů-öëäü 1234567890 _?:!(%/*+#&@[]{}\/qweASD,.-§p)";

            string replacedText = text.RemoveAccents();

            Assert.Equal(@"ERTZSDCNertzsdcn-euioay-u-oeau 1234567890 _?:!(%/*+#&@[]{}\/qweASD,.-§p)", replacedText);
        }

        [Fact]
        public void CorrectlyKeepsOnlyLettersNumbersAndSpaces()
        {
            string text = @"ĚŘŤŽŠĎČŇěřťžšďčň-éúíóáý-ů-öëäü 1234567890 _?:!(%/*+#&@[]{}\/qweASD,.-§p)";

            string replacedText = text.KeepLettersNumbersAndSpace();

            Assert.Equal(@"ĚŘŤŽŠĎČŇěřťžšďčňéúíóáýůöëäü 1234567890 qweASDp", replacedText);
        }
    }
}
