let _modPath;

const scope = GetRootScope()

const log = message => Helpers.ConsoleInfo(`[MOD] Free Bandwidth: ${message}`)

exports.initialize = modPath => {
  log("Initializing..")

  const oldAddTransaction = GetRootScope().addTransaction

  const newAddTransaction = (label, amount, changeBalance = false) => {

    let newAmount = amount
    let newName = label
    let newChangeBalance = changeBalance

    const exclusion = "Hosting bandwidth"
    const isExcluded = label.indexOf(exclusion) !== -1

    if (isExcluded) {
      newName = `[FREE] ${label}`
      newAmount = 0.01
      newChangeBalance = false
    }

    return oldAddTransaction(newName, newAmount, newChangeBalance)
  }

  GetRootScope().addTransaction = newAddTransaction
}